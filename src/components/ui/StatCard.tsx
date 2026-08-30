import { cn } from "@/lib/cn";
import type { LucideIcon } from "lucide-react";
import { Card } from "./Card";

type StatTone = "brand" | "accent" | "navy" | "success" | "danger";

const toneClasses: Record<StatTone, string> = {
  brand: "bg-brand-50 text-brand",
  accent: "bg-accent-50 text-accent-600",
  navy: "bg-navy/[0.06] text-navy",
  success: "bg-success-50 text-success-600",
  danger: "bg-danger-50 text-danger-600",
};

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  /** Small caption under the metric (e.g. "No data yet"). */
  note?: string;
  tone?: StatTone;
  className?: string;
}

/** Dashboard metric tile — tinted icon, label, value and caption. */
export default function StatCard({
  label,
  value,
  icon: Icon,
  note,
  tone = "brand",
  className,
}: StatCardProps) {
  return (
    <Card className={cn("p-4 sm:p-5", className)}>
      <div className="flex items-start gap-3.5">
        {Icon && (
          <span className={cn("icon-tile h-11 w-11 rounded-lg", toneClasses[tone])}>
            <Icon size={20} aria-hidden="true" />
          </span>
        )}
        <div className="min-w-0 pt-0.5">
          <p className="truncate text-[13px] font-semibold text-navy/50">{label}</p>
          <p className="mt-1.5 text-[26px] font-bold leading-none tracking-tight text-navy">{value}</p>
        </div>
      </div>
      {note && <p className="mt-3.5 text-xs text-navy/40">{note}</p>}
    </Card>
  );
}
