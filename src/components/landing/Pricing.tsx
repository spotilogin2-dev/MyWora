import { Check, Headphones } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Plan {
  name: string;
  blurb: string;
  price: string;
  priceNote: string;
  features: string[];
  popular?: boolean;
  cta: { label: string; to?: string; href?: string };
}

/**
 * Plan structure is designed so real database-driven plans can be connected
 * later. No commercial pricing is invented — plans are marked free during beta.
 */
const plans: Plan[] = [
  {
    name: "Starter",
    blurb: "Perfect for small workshops just getting started.",
    price: "Free",
    priceNote: "during beta",
    features: [
      "Up to 2 staff",
      "1,000 customers",
      "1,000 service entries",
      "2 GB storage",
      "Customer portal",
    ],
    cta: { label: "Get Started", to: "/register" },
  },
  {
    name: "Growth",
    blurb: "Ideal for growing workshops with more operations.",
    price: "Free",
    priceNote: "during beta",
    features: [
      "Up to 5 staff",
      "5,000 customers",
      "Unlimited service entries",
      "5 GB storage",
      "Customer + vehicle portal",
      "Follow-up system",
    ],
    popular: true,
    cta: { label: "Get Started", to: "/register" },
  },
  {
    name: "Pro",
    blurb: "Advanced tools for established workshops.",
    price: "Free",
    priceNote: "during beta",
    features: [
      "Up to 10 staff",
      "Unlimited customers",
      "Unlimited service entries",
      "20 GB storage",
      "All portals",
      "Priority support",
    ],
    cta: { label: "Get Started", to: "/register" },
  },
  {
    name: "Enterprise",
    blurb: "For multi-branch or large workshop businesses.",
    price: "Custom",
    priceNote: "tailored to you",
    features: [
      "Unlimited staff",
      "Unlimited everything",
      "Custom integrations",
      "Dedicated support",
      "API access",
    ],
    cta: { label: "Contact Sales", href: "#contact" },
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Pricing"
          title={
            <>
              Simple, Transparent
              <br />
              Pricing
            </>
          }
          aside={<p>Choose the plan that fits your workshop. Upgrade or downgrade anytime.</p>}
        />

        <Reveal delay={100}>
          <div className="mt-8 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-brand/15 bg-brand-50 px-4 py-1.5 text-xs font-bold text-brand">
              Free during beta · No credit card required
            </span>
          </div>
        </Reveal>

        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {plans.map((plan, index) => (
            <Reveal key={plan.name} delay={index * 80} className="h-full">
              <div
                className={`relative flex h-full flex-col rounded-2xl border bg-white p-6 shadow-card ${
                  plan.popular
                    ? "border-brand/60 ring-2 ring-brand/20 xl:-translate-y-2"
                    : "border-navy/[0.08]"
                }`}
              >
                {plan.popular && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-brand px-3.5 py-1 text-[11px] font-bold text-white shadow-md shadow-brand/30">
                    Most Popular
                  </span>
                )}

                <h3 className="text-base font-extrabold text-navy">{plan.name}</h3>
                <p className="mt-1 text-[13px] leading-relaxed text-navy/50">{plan.blurb}</p>

                <div className="mt-5 flex items-baseline gap-1.5">
                  <span className="text-[2rem] font-extrabold tracking-tight text-navy">{plan.price}</span>
                  <span className="text-xs font-semibold text-navy/45">{plan.priceNote}</span>
                </div>

                <ul className="mt-5 flex flex-col gap-2.5 border-t border-navy/5 pt-5">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-[13px] text-navy/70">
                      <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand text-white">
                        <Check size={10} strokeWidth={3.5} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6">
                  <Button
                    variant={plan.popular ? "primary" : "outline"}
                    withArrow={false}
                    className="w-full"
                    to={plan.cta.to}
                    href={plan.cta.href}
                  >
                    {plan.cta.label}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}

          {/* Custom solution card */}
          <Reveal delay={320} className="h-full md:col-span-2 xl:col-span-1">
            <div className="flex h-full flex-col rounded-2xl border border-navy/[0.08] bg-mist/50 p-6">
              <span className="icon-tile bg-white text-accent-600 shadow-card">
                <Headphones size={20} aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-extrabold leading-snug text-navy">
                Need a custom solution?
              </h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-navy/55">
                We're here to help you build what you need.
              </p>
              <div className="mt-auto pt-6">
                <Button variant="outline" href="#contact" className="w-full">
                  Contact Us
                </Button>
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-8 text-center text-sm text-navy/45">
          MyWora is free during beta. Final pricing will be announced before public launch.
        </p>
      </div>
    </section>
  );
}
