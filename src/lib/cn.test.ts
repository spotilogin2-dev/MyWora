import { describe, expect, it } from "vitest";
import { cn } from "./cn";

describe("cn", () => {
  it("joins class names", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    const isActive = false;
    expect(cn("a", isActive && "b", undefined, null, "c")).toBe("a c");
  });

  it("supports conditional objects", () => {
    expect(cn("base", { active: true, hidden: false })).toBe("base active");
  });

  it("lets later Tailwind classes override earlier ones", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
    expect(cn("text-sm", "text-lg")).toBe("text-lg");
  });
});
