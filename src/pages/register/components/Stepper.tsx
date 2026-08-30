import { Fragment } from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { REGISTRATION_STEPS } from "@/lib/registration";
import type { RegistrationStep } from "@/lib/registration";

interface StepperProps {
  current: RegistrationStep;
  /** Highest validated step — gates which steps are clickable. */
  furthest: RegistrationStep;
  onSelect: (step: RegistrationStep) => void;
}

export default function Stepper({ current, furthest, onSelect }: StepperProps) {
  return (
    <nav aria-label="Registration progress">
      <ol className="flex items-start">
        {REGISTRATION_STEPS.map((item, index) => {
          const isDone = item.step < current;
          const isCurrent = item.step === current;
          const reachable = item.step <= furthest;
          return (
            <Fragment key={item.step}>
              {index > 0 && (
                <li
                  aria-hidden="true"
                  className={cn(
                    "mx-3 mt-[17px] h-0.5 flex-1 rounded-full transition-colors sm:mx-4",
                    item.step <= current ? "bg-brand" : "bg-navy/10",
                  )}
                />
              )}
              <li>
                <button
                  type="button"
                  onClick={() => onSelect(item.step)}
                  disabled={!reachable}
                  aria-label={`Step ${item.step}: ${item.title}`}
                  aria-current={isCurrent ? "step" : undefined}
                  className="flex items-start gap-3 rounded-xl text-left focus-ring"
                >
                  <span
                    className={cn(
                      "grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm font-bold transition-colors",
                      isDone && "bg-brand text-white",
                      isCurrent && "bg-brand text-white ring-4 ring-brand/15",
                      !isDone && !isCurrent && "bg-navy/[0.06] text-navy/60",
                    )}
                  >
                    {isDone ? <Check size={16} strokeWidth={2.5} aria-hidden="true" /> : item.step}
                  </span>
                  <span className="hidden flex-col leading-tight sm:flex">
                    <span className={cn("text-sm font-bold", isCurrent ? "text-brand" : "text-navy")}>
                      {item.title}
                    </span>
                    <span className="mt-1 text-xs text-navy/45">{item.description}</span>
                  </span>
                </button>
              </li>
            </Fragment>
          );
        })}
      </ol>
      {/* Compact caption while the per-step labels are collapsed on small screens. */}
      <p className="mt-3 text-sm font-bold text-navy/60 sm:hidden">
        Step {current} of {REGISTRATION_STEPS.length} — {REGISTRATION_STEPS[current - 1].title}
      </p>
    </nav>
  );
}
