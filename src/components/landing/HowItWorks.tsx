import { Building2, ClipboardList, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Step {
  number: string;
  icon: LucideIcon;
  tone: "blue" | "orange";
  title: string;
  desc: string;
}

const steps: Step[] = [
  {
    number: "01",
    icon: Building2,
    tone: "blue",
    title: "Create Your Workshop",
    desc: "Sign up and create your workshop workspace.",
  },
  {
    number: "02",
    icon: ClipboardList,
    tone: "orange",
    title: "Add Customers & Services",
    desc: "Add customers, vehicles and service entries.",
  },
  {
    number: "03",
    icon: TrendingUp,
    tone: "blue",
    title: "Manage & Grow",
    desc: "MyWora organizes records, follow-ups and business information in one place.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="bg-cream py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              Get Started in
              <br />3 Simple Steps
            </>
          }
          aside={<p>MyWora makes workshop management simple, fast and efficient.</p>}
        />

        <div className="relative mt-16">
          {/* Dotted connector between the step circles (desktop only) */}
          <div
            aria-hidden="true"
            className="absolute left-[16.66%] right-[16.66%] top-6 hidden border-t-2 border-dotted border-navy/15 lg:block"
          />

          <ol className="grid gap-10 lg:grid-cols-3 lg:gap-8">
            {steps.map((step, index) => (
              <li key={step.number} className="relative flex flex-col items-center">
                <Reveal delay={index * 120} className="w-full">
                  <span
                    className={`relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border-2 bg-white text-sm font-extrabold ${
                      step.tone === "blue" ? "border-brand text-brand" : "border-accent text-accent-600"
                    }`}
                  >
                    {step.number}
                  </span>

                  <div className="card mt-6 w-full p-6">
                    <div className="flex items-center gap-3.5">
                      <span
                        className={`icon-tile ${
                          step.tone === "blue" ? "bg-brand-50 text-brand" : "bg-accent-50 text-accent-600"
                        }`}
                      >
                        <step.icon size={20} strokeWidth={2} aria-hidden="true" />
                      </span>
                      <h3 className="text-[15px] font-bold leading-snug text-navy">{step.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-navy/55">{step.desc}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
