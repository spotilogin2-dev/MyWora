import { Check } from "lucide-react";
import Reveal from "../Reveal";
import FollowUpPreview from "./mockups/FollowUpPreview";

const highlights = [
  "Time and distance based reminders",
  "Overdue, due-soon and upcoming views",
  "One-tap call or message",
];

export default function FollowUps() {
  return (
    <section id="follow-ups" className="bg-cream py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div aria-hidden="true" className="dot-grid absolute -left-8 -top-8 hidden h-24 w-36 lg:block" />
            <div className="relative max-w-md lg:mr-auto">
              <FollowUpPreview />
            </div>
          </div>
        </Reveal>

        <Reveal delay={140} className="order-1 lg:order-2">
          <p className="eyebrow">Follow-Ups</p>
          <h2 className="mt-3 max-w-md text-h1 text-navy">
            Never Miss
            <br />
            The Next Service.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-navy/55">
            MyWora helps workshops identify upcoming and overdue service follow-ups based on service history
            and vehicle usage.
          </p>

          <ul className="mt-8 flex flex-col gap-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-navy/75">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent-50 text-accent-600">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
