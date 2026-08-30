/**
 * Frontend plan definitions for the Super Admin console.
 *
 * These mirror the public pricing structure shown on the landing page and are
 * deliberately frontend constants — NOT application data. Database-driven
 * plans and the subscription architecture arrive in Phase 21, at which point
 * this config is replaced by API data.
 */
export interface PlatformPlan {
  name: string;
  blurb: string;
  priceLabel: string;
  priceSuffix: string;
  features: string[];
  popular?: boolean;
}

export const PLATFORM_PLANS: PlatformPlan[] = [
  {
    name: "Starter",
    blurb: "Perfect for small workshops just getting started.",
    priceLabel: "Free",
    priceSuffix: "during beta",
    features: [
      "Up to 2 staff",
      "1,000 customers",
      "1,000 service entries",
      "2 GB storage",
      "Customer portal",
    ],
  },
  {
    name: "Growth",
    blurb: "Ideal for growing workshops with more operations.",
    priceLabel: "Free",
    priceSuffix: "during beta",
    features: [
      "Up to 5 staff",
      "5,000 customers",
      "Unlimited service entries",
      "5 GB storage",
      "Customer + vehicle portal",
      "Follow-up system",
    ],
    popular: true,
  },
  {
    name: "Pro",
    blurb: "Advanced tools for established workshops.",
    priceLabel: "Free",
    priceSuffix: "during beta",
    features: [
      "Up to 10 staff",
      "Unlimited customers",
      "Unlimited service entries",
      "20 GB storage",
      "All portals",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    blurb: "For multi-branch or large workshop businesses.",
    priceLabel: "Custom",
    priceSuffix: "tailored to you",
    features: [
      "Unlimited staff",
      "Unlimited everything",
      "Custom integrations",
      "Dedicated support",
      "API access",
    ],
  },
];
