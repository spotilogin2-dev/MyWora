import { Bell, Check } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import WorkspacePreview from "./mockups/WorkspacePreview";

export default function ProductShowcase() {
  return (
    <section id="product-experience" className="overflow-hidden bg-mist py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Inside MyWora"
          title={
            <>
              One Workspace for
              <br />
              Your Entire Workshop
            </>
          }
          aside={
            <p>
              Customer records, vehicle history, income, expenses and follow-ups — always organized, always
              within reach.
            </p>
          }
        />

        <div className="relative mx-auto mt-14 max-w-5xl">
          {/* Decorations */}
          <div aria-hidden="true" className="dot-grid absolute -left-10 top-10 hidden h-28 w-44 lg:block" />
          <div
            aria-hidden="true"
            className="absolute -right-8 bottom-12 hidden h-24 w-36 rounded-2xl bg-gradient-to-br from-accent-400 to-accent-600 lg:block"
          />

          <Reveal className="relative z-10">
            <WorkspacePreview />
          </Reveal>

          {/* Floating chips (desktop) */}
          <div
            aria-hidden="true"
            className="absolute -top-5 right-6 hidden items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 shadow-float md:flex"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-success-50 text-success-500">
              <Check size={13} strokeWidth={3} />
            </span>
            <span className="text-xs font-extrabold text-navy">PKR 15,500 posted</span>
            <span className="text-xs text-navy/45">· Oil Change</span>
          </div>
          <div
            aria-hidden="true"
            className="absolute -bottom-5 left-6 hidden items-center gap-2 rounded-full bg-white py-2 pl-3 pr-4 shadow-float md:flex"
          >
            <span className="grid h-6 w-6 place-items-center rounded-full bg-accent-50 text-accent-600">
              <Bell size={12} />
            </span>
            <span className="text-xs font-extrabold text-navy">Follow-up due</span>
            <span className="text-xs text-navy/45">· Honda Civic</span>
          </div>
        </div>
      </div>
    </section>
  );
}
