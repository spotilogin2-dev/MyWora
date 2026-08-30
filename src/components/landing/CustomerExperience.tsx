import { Check } from "lucide-react";
import Reveal from "../Reveal";
import PortalPreview from "./mockups/PortalPreview";

const highlights = ["Vehicle service history", "Bills and invoices on demand", "Service reminders"];

export default function CustomerExperience() {
  return (
    <section id="customer-portal" className="bg-white py-20 lg:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Customer Portal</p>
          <h2 className="mt-3 max-w-md text-h1 text-navy">
            Your Customers
            <br />
            Stay Connected.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-navy/55">
            Customers can access their vehicle records, service history and bills through their own portal —
            no phone calls needed.
          </p>

          <ul className="mt-8 flex flex-col gap-3.5">
            {highlights.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-bold text-navy/75">
                <span className="grid h-5 w-5 shrink-0 place-items-center rounded-full bg-brand-50 text-brand">
                  <Check size={12} strokeWidth={3} aria-hidden="true" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={140} className="relative">
          <div aria-hidden="true" className="dot-grid absolute -right-8 -top-8 hidden h-24 w-36 lg:block" />
          <div className="relative max-w-md lg:ml-auto">
            <PortalPreview />
            <div
              aria-hidden="true"
              className="absolute -left-6 bottom-12 hidden items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 shadow-float md:flex"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-500 text-[10px] font-extrabold text-white">
                ✦
              </span>
              <span className="text-xs font-extrabold text-navy">Next service</span>
              <span className="text-xs text-navy/45">· 5,000 km</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
