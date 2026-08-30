/**
 * Date-range helpers for the Super Admin dashboard.
 *
 * Pure utilities over the current date — they produce display labels and axis
 * ticks only. No data is attached to these ranges until the database layer
 * arrives in Phase 6.
 */
export type RangeKey = "week" | "month" | "year" | "all";

export interface DateRange {
  start: Date | null;
  end: Date | null;
  /** Human label shown in the range control, e.g. "May 01, 2024 - May 31, 2024". */
  label: string;
}

const fullDayFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "2-digit",
  year: "numeric",
});
const shortDayFmt = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" });
const monthFmt = new Intl.DateTimeFormat("en-US", { month: "short" });

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, days: number): Date {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

export function getRange(key: RangeKey, now: Date = new Date()): DateRange {
  const today = startOfDay(now);

  switch (key) {
    case "week": {
      // Monday-based week.
      const weekday = (today.getDay() + 6) % 7;
      const start = addDays(today, -weekday);
      const end = addDays(start, 6);
      return { start, end, label: `${fullDayFmt.format(start)} - ${fullDayFmt.format(end)}` };
    }
    case "month": {
      const start = new Date(today.getFullYear(), today.getMonth(), 1);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      return { start, end, label: `${fullDayFmt.format(start)} - ${fullDayFmt.format(end)}` };
    }
    case "year": {
      const start = new Date(today.getFullYear(), 0, 1);
      const end = new Date(today.getFullYear(), 11, 31);
      return { start, end, label: `${fullDayFmt.format(start)} - ${fullDayFmt.format(end)}` };
    }
    case "all":
    default:
      return { start: null, end: null, label: "All Time" };
  }
}

/** Axis tick labels for the (currently empty) platform chart. */
export function getRangeTicks(key: RangeKey, now: Date = new Date()): string[] {
  if (key === "all") {
    const base = startOfDay(now);
    return Array.from({ length: 6 }, (_, i) =>
      monthFmt.format(new Date(base.getFullYear(), base.getMonth() - 5 + i, 1)),
    );
  }

  const { start, end } = getRange(key, now);
  if (!start || !end) return getRangeTicks("all", now);

  if (key === "year") {
    return [0, 2, 4, 6, 8, 10].map((month) => monthFmt.format(new Date(start.getFullYear(), month, 1)));
  }

  const spanDays = Math.max(1, Math.round((end.getTime() - start.getTime()) / 86_400_000));
  const points = key === "week" ? 7 : 5;
  return Array.from({ length: points }, (_, i) => {
    const day = addDays(start, Math.round((spanDays * i) / (points - 1)));
    return shortDayFmt.format(day);
  });
}

export const RANGE_OPTIONS: { value: RangeKey; label: string }[] = [
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
  { value: "all", label: "All Time" },
];
