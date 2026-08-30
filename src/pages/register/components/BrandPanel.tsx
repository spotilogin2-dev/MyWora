import { BarChart3, CalendarCheck2, LayoutGrid, ShieldCheck, Users } from "lucide-react";
import WorkshopIllustration from "./WorkshopIllustration";

const PANEL_POINTS = [
  {
    icon: LayoutGrid,
    title: "All-in-One Management",
    description: "Manage customers, vehicles, services, income, expenses and follow-ups.",
  },
  {
    icon: Users,
    title: "Customer & Vehicle Portals",
    description: "Your customers get their own secure portal to view history and bills.",
  },
  {
    icon: CalendarCheck2,
    title: "Smart Follow-Ups",
    description: "Never miss the next service with automated follow-up reminders.",
  },
  {
    icon: BarChart3,
    title: "Grow Your Business",
    description: "Powerful reports and insights to help you make better decisions.",
  },
] as const;

/** Left brand panel of the registration page — desktop (xl) only. */
export default function BrandPanel() {
  return (
    <aside
      aria-label="About MyWora"
      className="hidden border-r border-navy/[0.06] bg-mist px-9 pb-8 pt-12 xl:flex xl:flex-col"
    >
      <h1 className="text-[1.95rem] font-bold leading-[1.18] tracking-tight text-navy">
        Create Your
        <br />
        Workshop Workspace
      </h1>
      <p className="mt-4 max-w-[300px] text-[15px] leading-relaxed text-navy/60">
        Join the workshop owners who trust MyWora to manage their operations, customers and grow their
        business.
      </p>

      <ul className="mt-10 space-y-6">
        {PANEL_POINTS.map((point) => (
          <li key={point.title} className="flex items-start gap-4">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand">
              <point.icon size={18} aria-hidden="true" />
            </span>
            <div>
              <p className="text-sm font-bold text-navy">{point.title}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-navy/55">{point.description}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="relative mt-auto pt-12">
        <WorkshopIllustration className="w-full" />
        <div className="relative z-10 -mt-9 mr-3 flex items-start gap-3 rounded-2xl bg-white p-4 shadow-card ring-1 ring-navy/[0.06]">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-success-50 text-success-600">
            <ShieldCheck size={18} aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-bold text-navy">Secure &amp; Reliable</p>
            <p className="mt-0.5 text-[13px] leading-relaxed text-navy/55">
              Your data is encrypted and 100% protected with enterprise-grade security.
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
