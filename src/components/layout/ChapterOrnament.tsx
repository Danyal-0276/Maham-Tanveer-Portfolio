export function ChapterOrnament({ variant = "orbit" }: { variant?: "orbit" | "flower" | "compass" }) {
  return (
    <div className="chapter-ornament" aria-hidden="true">
      <svg viewBox="0 0 400 400" fill="none" stroke="currentColor" strokeWidth="0.8">
        <g data-ornament-ring style={{ transformOrigin: "200px 200px" }}>
          {variant === "flower" ? Array.from({ length: 8 }, (_, i) => <ellipse key={i} cx="200" cy="155" rx="54" ry="125" transform={`rotate(${i * 45} 200 200)`} />) : <>
            <circle cx="200" cy="200" r="155" /><circle cx="200" cy="200" r="125" />
            <ellipse cx="200" cy="200" rx="70" ry="155" transform="rotate(35 200 200)" />
            <ellipse cx="200" cy="200" rx="70" ry="155" transform="rotate(-35 200 200)" />
          </>}
          {variant === "compass" && <path data-draw-line d="M200 15L220 180L385 200L220 220L200 385L180 220L15 200L180 180Z" />}
          <circle cx="200" cy="45" r="5" fill="currentColor" /><circle cx="355" cy="200" r="3" fill="currentColor" />
        </g>
        <path data-draw-line d="M35 200H365M200 35V365" strokeDasharray="2 8" />
      </svg>
    </div>
  );
}
