import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Calendar,
  Car,
  CheckCircle2,
  ChevronDown,
  Hourglass,
  Inbox,
  PauseCircle,
  Receipt,
  Store,
  TrendingUp,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import StatCard from "@/components/ui/StatCard";
import { cn } from "@/lib/cn";
import { getRange, getRangeTicks, RANGE_OPTIONS, type RangeKey } from "@/lib/dateRange";
import BusinessesTableCard from "./components/BusinessesTableCard";

/* ---------------------------------------------------------------- */
/* All metrics below are TRUE zeros — the platform has no data until */
/* Phase 6 connects the database. Nothing here is demo content.      */
/* ---------------------------------------------------------------- */

const stats: { label: string; icon: LucideIcon; tone: "brand" | "success" | "accent" | "danger" }[] = [
  { label: "Total Businesses", icon: Building2, tone: "brand" },
  { label: "Active Businesses", icon: CheckCircle2, tone: "success" },
  { label: "Trial Businesses", icon: Hourglass, tone: "accent" },
  { label: "Suspended Businesses", icon: PauseCircle, tone: "danger" },
  { label: "Total Customers", icon: Users, tone: "brand" },
  { label: "Total Vehicles", icon: Car, tone: "brand" },
];

const miniStats: { label: string; icon: LucideIcon; tone: "brand" | "success" | "danger" }[] = [
  { label: "Service Entries", icon: Inbox, tone: "brand" },
  { label: "Total Income", icon: ArrowUpRight, tone: "success" },
  { label: "Total Expenses", icon: Receipt, tone: "danger" },
  { label: "Net Profit", icon: TrendingUp, tone: "success" },
];

const miniToneClasses: Record<"brand" | "success" | "danger", string> = {
  brand: "bg-brand-50 text-brand",
  success: "bg-success-50 text-success-600",
  danger: "bg-danger-50 text-danger-600",
};

/** Compact "This Month" style dropdown used for date ranges. */
function RangeDropdown({
  value,
  onChange,
  withCalendar = false,
}: {
  value: RangeKey;
  onChange: (value: RangeKey) => void;
  withCalendar?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const current = RANGE_OPTIONS.find((option) => option.value === value) ?? RANGE_OPTIONS[1];

  return (
    <div className="relative">
      {open && <div aria-hidden="true" className="fixed inset-0 z-20" onClick={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => setOpen((state) => !state)}
        aria-haspopup="listbox"
        aria-expanded={open}
        className={cn(
          "focus-ring relative inline-flex h-10 items-center gap-2 rounded-lg border border-navy/10 bg-white px-3.5 text-[13px] font-semibold text-navy transition-colors hover:border-navy/25",
          withCalendar && "pl-9",
        )}
      >
        {withCalendar && <Calendar size={15} aria-hidden="true" className="absolute left-3 text-navy/45" />}
        {withCalendar ? getRange(value).label : current.label}
        <ChevronDown size={15} aria-hidden="true" className="text-navy/40" />
      </button>
      {open && (
        <ul
          role="listbox"
          aria-label="Date range"
          className="absolute right-0 top-full z-30 mt-1.5 w-44 rounded-xl border border-navy/10 bg-white p-1.5 shadow-float"
        >
          {RANGE_OPTIONS.map((option) => (
            <li key={option.value}>
              <button
                type="button"
                role="option"
                aria-selected={option.value === value}
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2 text-[13px] font-semibold transition-colors",
                  option.value === value
                    ? "bg-brand-50 text-brand"
                    : "text-navy/65 hover:bg-navy/[0.04] hover:text-navy",
                )}
              >
                {option.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function MiniStat({
  label,
  icon: Icon,
  tone,
}: {
  label: string;
  icon: LucideIcon;
  tone: "brand" | "success" | "danger";
}) {
  return (
    <div>
      <div className="flex items-center gap-2.5">
        <span className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg", miniToneClasses[tone])}>
          <Icon size={16} aria-hidden="true" />
        </span>
        <p className="text-xs font-semibold text-navy/50">{label}</p>
      </div>
      <p className="mt-2.5 pl-0.5 text-xl font-bold tracking-tight text-navy">0</p>
      <p className="mt-1 pl-0.5 text-[11px] text-navy/40">No data yet</p>
    </div>
  );
}

const Y_AXIS_LABELS = ["1", "0.8", "0.6", "0.4", "0.2", "0"];

export default function Overview() {
  const [range, setRange] = useState<RangeKey>("month");
  const ticks = useMemo(() => getRangeTicks(range), [range]);

  return (
    <div className="flex flex-col gap-5">
      {/* Welcome header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-[22px] font-bold tracking-tight text-navy sm:text-2xl">Welcome back, Admin!</h1>
          <p className="mt-1 text-sm text-navy/55">Here's what's happening with your platform today.</p>
        </div>
        <RangeDropdown value={range} onChange={setRange} withCalendar />
      </div>

      {/* Metric tiles */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={0}
            icon={stat.icon}
            tone={stat.tone}
            note="No data yet"
          />
        ))}
      </div>

      {/* Platform overview + recent registrations */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-navy">Platform Overview</h2>
            <RangeDropdown value={range} onChange={setRange} />
          </div>

          <div className="mt-5 grid grid-cols-2 gap-5 xl:grid-cols-4">
            {miniStats.map((mini) => (
              <MiniStat key={mini.label} label={mini.label} icon={mini.icon} tone={mini.tone} />
            ))}
          </div>

          {/* Empty chart — axes render real ranges; the series connects in Phase 6 */}
          <div className="mt-6 flex gap-3">
            <div className="flex h-52 w-8 flex-col justify-between text-right text-[10px] font-semibold text-navy/35">
              {Y_AXIS_LABELS.map((label) => (
                <span key={label}>{label}</span>
              ))}
            </div>
            <div className="relative flex-1">
              <div className="flex h-52 flex-col justify-between border-l border-navy/[0.07]">
                {Y_AXIS_LABELS.map((label) => (
                  <div key={label} aria-hidden="true" className="border-t border-dashed border-navy/[0.07]" />
                ))}
              </div>
              <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-navy/[0.05] text-navy/30">
                  <BarChart3 size={24} aria-hidden="true" />
                </span>
                <p className="mt-3 text-sm font-bold text-navy">No data available yet</p>
                <p className="mt-1 max-w-[280px] text-center text-xs leading-relaxed text-navy/45">
                  Once businesses start using MyWora, you'll see important metrics here.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-2 flex justify-between pl-11 text-[10px] font-semibold text-navy/35">
            {ticks.map((tick) => (
              <span key={tick} className="whitespace-nowrap">
                {tick}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-center gap-6 border-t border-navy/[0.05] pt-4 text-xs font-semibold text-navy/55">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand" />
              Income
            </span>
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="h-2 w-2 rounded-full bg-accent-500" />
              Expenses
            </span>
          </div>
        </Card>

        <Card className="flex flex-col p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-base font-extrabold text-navy">Recent Registrations</h2>
            <Link
              to="/super-admin/businesses"
              className="text-[13px] font-bold text-brand transition-colors hover:text-brand-600"
            >
              View All
            </Link>
          </div>
          <EmptyState
            variant="plain"
            icon={Store}
            title="No businesses registered yet"
            description="When businesses sign up, they'll appear here."
            className="flex-1"
          />
        </Card>
      </div>

      {/* Businesses table */}
      <BusinessesTableCard />
    </div>
  );
}
