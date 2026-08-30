import { Play } from "lucide-react";
import Button from "../ui/Button";
import Reveal from "../Reveal";
import DashboardPreview from "./mockups/DashboardPreview";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist pb-16 pt-28 lg:pb-24 lg:pt-44">
      <div className="container-x relative grid items-center gap-16 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-12">
        {/* Copy */}
        <div className="relative z-10">
          <Reveal>
            <h1 className="text-display text-navy">
              Run Your
              <br />
              Workshop
              <br />
              Smarter<span className="text-accent">.</span>
            </h1>
          </Reveal>

          <Reveal delay={110}>
            <p className="mt-6 max-w-md text-[15px] leading-relaxed text-navy/60 sm:text-base">
              All-in-one management platform for auto workshops. Manage customers, vehicles, services, income,
              expenses and follow-ups — all in one powerful workspace.
            </p>
          </Reveal>

          <Reveal delay={200}>
            <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
              <Button to="/register" size="lg">
                Start Free
              </Button>
              <a
                href="#how-it-works"
                className="group inline-flex items-center gap-3 text-sm font-bold text-navy"
              >
                <span className="grid h-11 w-11 place-items-center rounded-full border border-navy/10 bg-white shadow-card transition-all duration-200 group-hover:border-brand/40 group-hover:shadow-lg">
                  <Play size={14} fill="currentColor" aria-hidden="true" className="ml-0.5 text-brand" />
                </span>
                See How It Works
              </a>
            </div>
          </Reveal>

          {/* Trust statement — neutral, no invented customers or statistics */}
          <Reveal delay={280}>
            <div className="mt-10 flex items-center gap-3.5">
              <div className="flex -space-x-2.5" aria-hidden="true">
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-brand-300 to-brand-600 ring-2 ring-mist" />
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-accent-200 to-accent-500 ring-2 ring-mist" />
                <span className="h-8 w-8 rounded-full bg-gradient-to-br from-navy/60 to-navy ring-2 ring-mist" />
              </div>
              <p className="max-w-[250px] text-[13px] leading-snug text-navy/55">
                Trusted by workshop owners{" "}
                <span className="font-bold text-navy">building smarter businesses.</span>
              </p>
            </div>
          </Reveal>
        </div>

        {/* Product visual */}
        <div className="relative">
          <div
            aria-hidden="true"
            className="absolute -right-5 top-1/2 hidden h-64 w-36 -translate-y-[35%] rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 sm:block lg:-right-9 lg:h-72 lg:w-44"
          />
          <div aria-hidden="true" className="dot-grid absolute -bottom-8 left-2 hidden h-24 w-40 sm:block" />
          <Reveal delay={150} className="relative z-10">
            <div className="animate-float">
              <DashboardPreview />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
