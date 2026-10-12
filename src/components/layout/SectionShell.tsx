import type { ReactNode } from "react";
import type { MotionPreset } from "@/lib/section-motion";
import { cn } from "@/lib/utils";

// Content stays visible before hydration and independent of scroll position.
type SectionShellProps = {
  children: ReactNode;
  className?: string;
  preset?: MotionPreset;
  staggerChildren?: boolean;
  childPreset?: MotionPreset;
  splitHeading?: boolean;
  delay?: number;
};

export function SectionShell({ children, className }: SectionShellProps) {
  return <div className={cn(className)}>{children}</div>;
}
