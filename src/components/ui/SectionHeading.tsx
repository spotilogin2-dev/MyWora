import type { ReactNode } from "react";
import Reveal from "@/components/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: ReactNode;
  /** Optional right-hand column (paragraph, link, etc.) */
  aside?: ReactNode;
  className?: string;
}

/**
 * Shared editorial section header: blue eyebrow + oversized navy headline on
 * the left, supporting copy on the right (matches the reference layout).
 */
export default function SectionHeading({ eyebrow, title, aside, className = "" }: SectionHeadingProps) {
  return (
    <Reveal
      className={`grid gap-6 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-end ${className}`.trim()}
    >
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="mt-3 max-w-xl text-h1 text-navy">{title}</h2>
      </div>
      {aside && (
        <div className="max-w-md text-[15px] leading-relaxed text-navy/55 lg:justify-self-end lg:pb-1.5">
          {aside}
        </div>
      )}
    </Reveal>
  );
}
