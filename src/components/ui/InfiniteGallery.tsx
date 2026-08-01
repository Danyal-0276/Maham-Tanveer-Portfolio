"use client";

import { useMotionValue } from "framer-motion";
import { useEffect, useMemo, useRef } from "react";

export type InfiniteGalleryImage = {
  src: string;
  srcSet?: string;
  alt?: string;
  caption?: string;
};

type InfiniteGalleryProps = {
  images: InfiniteGalleryImage[];
  className?: string;
  density?: number;
  imageWidth?: number;
  imageHeight?: number;
  rounded?: number;
  dragSpeed?: number;
  driftAmount?: number;
  friction?: number;
  backgroundColor?: string;
  onSelect?: (image: InfiniteGalleryImage, index: number) => void;
};

function hash3(cx: number, cy: number, cz: number, salt: number) {
  let h = (cx | 0) * 0x8da6b343;
  h ^= Math.imul(cy | 0, 0xd8163841);
  h ^= Math.imul(cz | 0, 0xcb1ab31f);
  h ^= salt | 0;
  h ^= h >>> 16;
  h = Math.imul(h, 0x7feb352d);
  h ^= h >>> 15;
  h = Math.imul(h, 0x846ca68b);
  h ^= h >>> 16;
  return h >>> 0;
}

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

type Tile = {
  wx: number;
  wy: number;
  cx: number;
  cy: number;
  slot: number;
  octave: number;
  imgIdx: number;
  w: number;
  h: number;
  rot: number;
  bakedScale: number;
};

const PX_PER_UNIT = 6;
const CELL_SIZE = 110;
const MAX_RANGE = 20;
const CLICK_MOVE_THRESHOLD = 6;

/**
 * Infinite zoom-quilt gallery — adapted from Originkit Infinity Canvas.
 * Camera/zoom driven by motion values; DOM tiles pooled per octave.
 */
export function InfiniteGallery({
  images,
  className,
  density = 5,
  imageWidth = 168,
  imageHeight = 210,
  rounded = 0,
  dragSpeed = 18,
  driftAmount = 10,
  friction = 11,
  backgroundColor = "#efe8df",
  onSelect,
}: InfiniteGalleryProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<HTMLDivElement | null>(null);
  const onSelectRef = useRef(onSelect);
  onSelectRef.current = onSelect;

  const safeImages = images.length > 0 ? images : [];
  const safeDensity = Math.max(1, Math.min(15, Math.floor(density)));
  const safeImageWidth = Math.max(8, Math.min(4000, imageWidth));
  const safeImageHeight = Math.max(8, Math.min(4000, imageHeight));
  const safeRounded = Math.max(0, Math.min(20, rounded));
  const safeDragSpeed = Math.max(0.1, Math.min(5, dragSpeed / 20));
  const safeDriftAmount = Math.max(0, Math.min(20, driftAmount));
  const safeFriction = 1 - (Math.max(1, Math.min(20, friction)) / 20) * 0.3;

  const targetX = useMotionValue(0);
  const targetY = useMotionValue(0);
  const camX = useMotionValue(0);
  const camY = useMotionValue(0);
  const velX = useMotionValue(0);
  const velY = useMotionValue(0);
  const targetLogZoom = useMotionValue(0);
  const logZoom = useMotionValue(0);
  const velLogZoom = useMotionValue(0);
  const driftTX = useMotionValue(0);
  const driftTY = useMotionValue(0);
  const driftX = useMotionValue(0);
  const driftY = useMotionValue(0);

  const subN = Math.max(1, Math.ceil(Math.sqrt(safeDensity)));
  const subSize = CELL_SIZE / subN;
  const effectivePerCell = Math.min(safeDensity, subN * subN);
  const imagesCount = safeImages.length;
  const SCALE_MIN = 0.5;
  const SCALE_MAX = 1.45;

  const generateCell = useMemo(() => {
    return (gx: number, gy: number, octave: number): Tile[] => {
      const seed = hash3(gx, gy, octave | 0, 0x9e3779b1);
      const rand = mulberry32(seed);
      const totalSubs = subN * subN;
      const subs = Array.from({ length: totalSubs }, (_, i) => i);
      for (let i = totalSubs - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        const tmp = subs[i]!;
        subs[i] = subs[j]!;
        subs[j] = tmp;
      }

      const tiles: Tile[] = [];
      const count = Math.min(effectivePerCell, totalSubs);
      const pad = subSize * 0.12;
      const innerRange = Math.max(0, subSize - pad * 2);
      const cellX0 = gx * CELL_SIZE;
      const cellY0 = gy * CELL_SIZE;
      const wWorld = safeImageWidth / PX_PER_UNIT;
      const hWorld = safeImageHeight / PX_PER_UNIT;

      for (let slot = 0; slot < count; slot++) {
        const subIdx = subs[slot]!;
        const sx = subIdx % subN;
        const sy = Math.floor(subIdx / subN);
        tiles.push({
          wx: cellX0 + sx * subSize + pad + rand() * innerRange,
          wy: cellY0 + sy * subSize + pad + rand() * innerRange,
          cx: gx,
          cy: gy,
          slot,
          octave,
          imgIdx:
            imagesCount > 0
              ? Math.floor(rand() * imagesCount) % imagesCount
              : 0,
          w: wWorld,
          h: hWorld,
          rot: (rand() - 0.5) * 4,
          bakedScale: SCALE_MIN + rand() * (SCALE_MAX - SCALE_MIN),
        });
      }
      return tiles;
    };
  }, [
    imagesCount,
    safeImageWidth,
    safeImageHeight,
    subN,
    subSize,
    effectivePerCell,
  ]);

  useEffect(() => {
    const scene = sceneRef.current;
    const container = containerRef.current;
    if (!scene || imagesCount === 0) return;

    let cW = container?.clientWidth || 900;
    let cH = container?.clientHeight || 600;
    const ro = new ResizeObserver(() => {
      if (container) {
        cW = container.clientWidth || cW;
        cH = container.clientHeight || cH;
      }
    });
    if (container) ro.observe(container);

    const layerPools = new Map<
      number,
      {
        tileEls: Map<string, HTMLDivElement>;
        imgEls: Map<string, HTMLImageElement>;
      }
    >();

    const getPool = (octave: number) => {
      let pool = layerPools.get(octave);
      if (!pool) {
        pool = { tileEls: new Map(), imgEls: new Map() };
        layerPools.set(octave, pool);
      }
      return pool;
    };

    const disposeLayer = (octave: number) => {
      const pool = layerPools.get(octave);
      if (!pool) return;
      pool.tileEls.forEach((el) => {
        if (el.parentNode === scene) scene.removeChild(el);
      });
      pool.tileEls.clear();
      pool.imgEls.clear();
      layerPools.delete(octave);
    };

    const disposeAllLayers = () => {
      Array.from(layerPools.keys()).forEach(disposeLayer);
    };

    const removeTile = (octave: number, key: string) => {
      const pool = layerPools.get(octave);
      if (!pool) return;
      const el = pool.tileEls.get(key);
      if (el && el.parentNode === scene) scene.removeChild(el);
      pool.tileEls.delete(key);
      pool.imgEls.delete(key);
    };

    const ensureTile = (t: Tile): HTMLDivElement => {
      const pool = getPool(t.octave);
      const key = `${t.cx},${t.cy},${t.slot}`;
      let el = pool.tileEls.get(key);
      if (!el) {
        el = document.createElement("div");
        el.style.position = "absolute";
        el.style.left = "50%";
        el.style.top = "50%";
        el.style.transformOrigin = "0 0";
        el.style.willChange = "transform, opacity";
        el.style.pointerEvents = "auto";
        el.style.cursor = "pointer";
        el.dataset.tileKey = key;
        el.dataset.imgIdx = String(t.imgIdx);

        const frame = document.createElement("div");
        frame.style.width = "100%";
        frame.style.height = "100%";
        frame.style.overflow = "hidden";
        frame.style.boxShadow =
          "0 18px 40px rgba(15,23,42,0.14), 0 0 0 1px rgba(15,23,42,0.06)";
        frame.style.background = "#f8f5f2";

        const img = document.createElement("img");
        const src = safeImages[t.imgIdx];
        img.src = src?.src || "";
        if (src?.srcSet) img.srcset = src.srcSet;
        img.alt = src?.alt || "";
        img.draggable = false;
        img.loading = "lazy";
        img.decoding = "async";
        img.style.width = "100%";
        img.style.height = "100%";
        img.style.objectFit = "cover";
        img.style.display = "block";
        img.style.pointerEvents = "none";
        img.style.userSelect = "none";

        frame.appendChild(img);
        el.appendChild(frame);
        scene.appendChild(el);
        pool.tileEls.set(key, el);
        pool.imgEls.set(key, img);
      }
      return el;
    };

    const projectLayer = (
      octave: number,
      layerScale: number,
      layerAlpha: number,
      layerZBase: number,
      cx: number,
      cy: number
    ) => {
      const pool = getPool(octave);
      const camCellX = Math.floor(cx / CELL_SIZE);
      const camCellY = Math.floor(cy / CELL_SIZE);
      const worldHalfX = cW / 2 / (PX_PER_UNIT * layerScale);
      const worldHalfY = cH / 2 / (PX_PER_UNIT * layerScale);
      const rangeX = Math.min(
        MAX_RANGE,
        Math.ceil(worldHalfX / CELL_SIZE) + 1
      );
      const rangeY = Math.min(
        MAX_RANGE,
        Math.ceil(worldHalfY / CELL_SIZE) + 1
      );

      const visibleKeys = new Set<string>();
      const tilesThisFrame: Tile[] = [];

      for (let dy = -rangeY; dy <= rangeY; dy++) {
        for (let dx = -rangeX; dx <= rangeX; dx++) {
          tilesThisFrame.push(
            ...generateCell(camCellX + dx, camCellY + dy, octave)
          );
        }
      }

      const orderKeys: string[] = new Array(tilesThisFrame.length);
      const orderScale: number[] = new Array(tilesThisFrame.length);

      for (let i = 0; i < tilesThisFrame.length; i++) {
        const t = tilesThisFrame[i]!;
        const key = `${t.cx},${t.cy},${t.slot}`;
        visibleKeys.add(key);

        const dxPx = (t.wx - cx) * layerScale * PX_PER_UNIT;
        const dyPx = (t.wy - cy) * layerScale * PX_PER_UNIT;
        const s = t.bakedScale * layerScale;
        const el = ensureTile(t);
        const img = pool.imgEls.get(key);
        const wPx = t.w * PX_PER_UNIT;
        const hPx = t.h * PX_PER_UNIT;

        el.style.transform = `translate3d(${dxPx}px, ${dyPx}px, 0) scale(${s}) rotate(${t.rot}deg) translate(${-wPx / 2}px, ${-hPx / 2}px)`;
        el.style.width = `${wPx}px`;
        el.style.height = `${hPx}px`;
        el.style.opacity = String(layerAlpha);

        if (img) {
          const radiusPx =
            (safeRounded / 20) * (Math.min(wPx, hPx) / 2);
          img.style.borderRadius = `${radiusPx}px`;
          const frame = img.parentElement as HTMLDivElement | null;
          if (frame) frame.style.borderRadius = `${radiusPx}px`;
        }

        orderKeys[i] = key;
        orderScale[i] = t.bakedScale;
      }

      for (const key of Array.from(pool.tileEls.keys())) {
        if (!visibleKeys.has(key)) removeTile(octave, key);
      }

      const idxs = orderKeys.map((_, i) => i);
      idxs.sort((a, b) => orderScale[a]! - orderScale[b]!);
      for (let k = 0; k < idxs.length; k++) {
        const el = pool.tileEls.get(orderKeys[idxs[k]!]!);
        if (el) el.style.zIndex = String(layerZBase + k);
      }
    };

    let lastOctaves: Set<number> = new Set();

    const project = () => {
      const cx = camX.get();
      const cy = camY.get();
      const lz = logZoom.get();
      const octave = Math.floor(lz);
      const frac = lz - octave;

      projectLayer(octave, Math.pow(2, frac), 1 - frac, 0, cx, cy);
      projectLayer(octave + 1, Math.pow(2, frac - 1), frac, 100000, cx, cy);

      const nowOctaves = new Set<number>([octave, octave + 1]);
      for (const o of Array.from(lastOctaves)) {
        if (!nowOctaves.has(o)) disposeLayer(o);
      }
      for (const o of Array.from(layerPools.keys())) {
        if (!nowOctaves.has(o)) disposeLayer(o);
      }
      lastOctaves = nowOctaves;
    };

    project();

    let raf = 0;
    const loop = () => {
      targetX.set(targetX.get() + velX.get());
      targetY.set(targetY.get() + velY.get());
      velX.set(velX.get() * safeFriction);
      velY.set(velY.get() * safeFriction);

      const vlz = velLogZoom.get();
      if (vlz !== 0) {
        targetLogZoom.set(targetLogZoom.get() + vlz);
        velLogZoom.set(vlz * safeFriction);
      }

      driftX.set(lerp(driftX.get(), driftTX.get() * safeDriftAmount, 0.08));
      driftY.set(lerp(driftY.get(), driftTY.get() * safeDriftAmount, 0.08));
      camX.set(lerp(camX.get(), targetX.get() + driftX.get(), 0.16));
      camY.set(lerp(camY.get(), targetY.get() + driftY.get(), 0.16));
      logZoom.set(lerp(logZoom.get(), targetLogZoom.get(), 0.16));

      project();
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      disposeAllLayers();
    };
  }, [
    generateCell,
    safeFriction,
    safeDriftAmount,
    safeRounded,
    safeImages,
    imagesCount,
    camX,
    camY,
    logZoom,
    targetX,
    targetY,
    targetLogZoom,
    velX,
    velY,
    velLogZoom,
    driftX,
    driftY,
    driftTX,
    driftTY,
  ]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || imagesCount === 0) return;

    let dragging = false;
    let moved = false;
    let lastPX = 0;
    let lastPY = 0;
    let lastT = 0;
    let startPX = 0;
    let startPY = 0;
    let pid: number | null = null;
    let pressTarget: HTMLElement | null = null;

    const onDown = (e: PointerEvent) => {
      if (e.button !== 0 && e.pointerType === "mouse") return;
      dragging = true;
      moved = false;
      pid = e.pointerId;
      lastPX = e.clientX;
      lastPY = e.clientY;
      startPX = e.clientX;
      startPY = e.clientY;
      lastT = e.timeStamp;
      pressTarget = e.target instanceof HTMLElement ? e.target : null;
      try {
        el.setPointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      el.style.cursor = "grabbing";
    };

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      driftTX.set(Math.max(-1, Math.min(1, nx)));
      driftTY.set(Math.max(-1, Math.min(1, ny)));

      if (!dragging || e.pointerId !== pid) return;

      const dpx = e.clientX - lastPX;
      const dpy = e.clientY - lastPY;
      if (
        Math.hypot(e.clientX - startPX, e.clientY - startPY) >
        CLICK_MOVE_THRESHOLD
      ) {
        moved = true;
      }

      const lz = logZoom.get();
      const frac = lz - Math.floor(lz);
      const effScale =
        (1 - frac) * Math.pow(2, frac) + frac * Math.pow(2, frac - 1);
      const dWorldX = (-dpx / (PX_PER_UNIT * effScale)) * safeDragSpeed;
      const dWorldY = (-dpy / (PX_PER_UNIT * effScale)) * safeDragSpeed;
      targetX.set(targetX.get() + dWorldX);
      targetY.set(targetY.get() + dWorldY);

      const dt = Math.max(1, e.timeStamp - lastT);
      const k = 16 / dt;
      velX.set(dWorldX * k);
      velY.set(dWorldY * k);

      lastPX = e.clientX;
      lastPY = e.clientY;
      lastT = e.timeStamp;
    };

    const onUp = (e: PointerEvent) => {
      if (!dragging || e.pointerId !== pid) return;
      dragging = false;
      pid = null;
      try {
        el.releasePointerCapture(e.pointerId);
      } catch {
        /* ignore */
      }
      el.style.cursor = "grab";

      if (!moved && onSelectRef.current && pressTarget) {
        const tile = pressTarget.closest("[data-img-idx]") as HTMLElement | null;
        if (tile) {
          const idx = Number(tile.dataset.imgIdx);
          const image = safeImages[idx];
          if (image && Number.isFinite(idx)) onSelectRef.current(image, idx);
        }
      }
      pressTarget = null;
    };

    const onWheel = (e: WheelEvent) => {
      // Zoom only with ctrl/cmd (or trackpad pinch, which sets ctrlKey).
      // Plain wheel keeps normal page scroll so the section doesn't trap.
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      let delta = e.deltaY;
      if (e.deltaMode === 1) delta *= 16;
      else if (e.deltaMode === 2) delta *= 400;
      velLogZoom.set(velLogZoom.get() - delta * 0.00135 * safeDragSpeed);
    };

    const onLeave = () => {
      driftTX.set(0);
      driftTY.set(0);
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });
    el.addEventListener("pointerleave", onLeave);
    el.style.cursor = "grab";

    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      el.removeEventListener("wheel", onWheel);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [
    imagesCount,
    safeDragSpeed,
    safeImages,
    targetX,
    targetY,
    velX,
    velY,
    velLogZoom,
    logZoom,
    driftTX,
    driftTY,
  ]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor,
        touchAction: "none",
        userSelect: "none",
        cursor: "grab",
      }}
    >
      <div ref={sceneRef} style={{ position: "absolute", inset: 0 }} />
    </div>
  );
}
