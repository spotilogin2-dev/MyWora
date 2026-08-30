import { describe, expect, it } from "vitest";
import { PLATFORM_PLANS } from "./platform-plans";

describe("PLATFORM_PLANS", () => {
  it("defines the four public plans in order", () => {
    expect(PLATFORM_PLANS.map((plan) => plan.name)).toEqual(["Starter", "Growth", "Pro", "Enterprise"]);
  });

  it("marks Growth as the most popular plan", () => {
    expect(PLATFORM_PLANS.filter((plan) => plan.popular).map((plan) => plan.name)).toEqual(["Growth"]);
  });

  it("gives every plan a blurb, a price label and features", () => {
    for (const plan of PLATFORM_PLANS) {
      expect(plan.blurb.length).toBeGreaterThan(0);
      expect(plan.priceLabel.length).toBeGreaterThan(0);
      expect(plan.features.length).toBeGreaterThan(0);
    }
  });
});
