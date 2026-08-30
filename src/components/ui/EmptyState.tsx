import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  /** `boxed` draws a dashed container; `plain` sits directly on its parent card. */
  variant?: "boxed" | "plain";
}

/** Polished empty state — communicates why a list is empty and what comes next. */
export default function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
  variant = "boxed",
}: EmptyStateProps) {
  const plain = variant === "plain";
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center px-6 text-center",
        plain ? "py-10" : "rounded-2xl border border-dashed border-navy/15 bg-white/60 py-14",
        className,
      )}
    >
      {Icon && (
        <span
          className={cn(
            "grid shrink-0 place-items-center",
            plain
              ? "h-16 w-16 rounded-full bg-navy/[0.05] text-navy/35"
              : "h-12 w-12 rounded-2xl bg-mist text-navy/40",
          )}
        >
          <Icon size={plain ? 26 : 22} aria-hidden="true" />
        </span>
      )}
      <h3 className="mt-4 text-base font-extrabold text-navy">{title}</h3>
      {description && <p className="mt-1.5 max-w-sm text-sm leading-relaxed text-navy/50">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
