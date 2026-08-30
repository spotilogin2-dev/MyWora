import { describe, expect, it } from "vitest";
import { getRange, getRangeTicks } from "./dateRange";

// Wednesday, May 15 2024 — fixed "now" for deterministic assertions.
const NOW = new Date(2024, 4, 15);

describe("getRange", () => {
  it("computes the current month", () => {
    expect(getRange("month", NOW).label).toBe("May 01, 2024 - May 31, 2024");
  });

  it("computes a Monday-based week", () => {
    const range = getRange("week", NOW);
    expect(range.start?.getDay()).toBe(1);
    expect(range.label).toBe("May 13, 2024 - May 19, 2024");
  });

  it("computes the calendar year", () => {
    expect(getRange("year", NOW).label).toBe("Jan 01, 2024 - Dec 31, 2024");
  });

  it("falls back to All Time with no bounds", () => {
    const range = getRange("all", NOW);
    expect(range.label).toBe("All Time");
    expect(range.start).toBeNull();
    expect(range.end).toBeNull();
  });
});

describe("getRangeTicks", () => {
  it("builds seven daily ticks for a week", () => {
    const ticks = getRangeTicks("week", NOW);
    expect(ticks).toHaveLength(7);
    expect(ticks[0]).toBe("May 13");
    expect(ticks[6]).toBe("May 19");
  });

  it("builds five spread ticks for a month", () => {
    const ticks = getRangeTicks("month", NOW);
    expect(ticks).toHaveLength(5);
    expect(ticks[0]).toBe("May 1");
    expect(ticks[4]).toBe("May 31");
  });

  it("builds bi-monthly ticks for a year", () => {
    const ticks = getRangeTicks("year", NOW);
    expect(ticks).toEqual(["Jan", "Mar", "May", "Jul", "Sep", "Nov"]);
  });

  it("builds the last six months for All Time", () => {
    expect(getRangeTicks("all", NOW)).toEqual(["Dec", "Jan", "Feb", "Mar", "Apr", "May"]);
  });
});
