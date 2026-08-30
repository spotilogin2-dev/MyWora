/**
 * Static visual mockup of the MyWora follow-up system.
 * Marketing content only — not real application data, not connected to a backend.
 */
import { Gauge, Phone } from "lucide-react";

const followUps = [
  {
    title: "Brake Inspection",
    vehicle: "Honda Civic · ABC-123",
    due: "Due 3 days ago",
    status: "Overdue",
    tone: "red" as const,
  },
  {
    title: "Oil Change",
    vehicle: "Toyota Corolla · XYZ-789",
    due: "In 5 days",
    status: "Due Soon",
    tone: "orange" as const,
  },
  {
    title: "General Service",
    vehicle: "Suzuki Alto · LEB-456",
    due: "In 3 weeks",
    status: "Upcoming",
    tone: "blue" as const,
  },
];

const toneClasses = {
  red: "bg-danger-50 text-danger-500",
  orange: "bg-accent-50 text-accent-600",
  blue: "bg-brand-50 text-brand-600",
};

const dueClasses: Record<string, string> = {
  Overdue: "text-red-400",
  "Due Soon": "text-accent-600",
  Upcoming: "text-navy/45",
};

export default function FollowUpPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/[0.08] bg-white text-left shadow-float">
      {/* Header + filters */}
      <div className="border-b border-navy/5 px-5 py-4">
        <div className="flex items-center justify-between">
          <p className="text-sm font-extrabold text-navy">Service Follow-Ups</p>
          <span className="rounded-full bg-mist/80 px-2.5 py-1 text-[10px] font-bold text-navy/55">
            This Week
          </span>
        </div>
        <div className="mt-3 flex flex-wrap gap-1.5" aria-hidden="true">
          <span className="rounded-full bg-navy px-2.5 py-1 text-[10px] font-bold text-white">All</span>
          <span className="rounded-full bg-mist/80 px-2.5 py-1 text-[10px] font-bold text-navy/50">
            Overdue
          </span>
          <span className="rounded-full bg-mist/80 px-2.5 py-1 text-[10px] font-bold text-navy/50">
            Due Soon
          </span>
          <span className="rounded-full bg-mist/80 px-2.5 py-1 text-[10px] font-bold text-navy/50">
            Upcoming
          </span>
        </div>
      </div>

      {/* Rows */}
      <div className="px-5">
        {followUps.map((item) => (
          <div
            key={item.title}
            className="flex items-center gap-3 border-b border-navy/5 py-3.5 last:border-0"
          >
            <span
              className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${toneClasses[item.tone]}`}
            >
              {item.status}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-bold text-navy">{item.title}</p>
              <p className="truncate text-[11px] text-navy/45">{item.vehicle}</p>
            </div>
            <p className={`hidden shrink-0 text-[11px] font-bold sm:block ${dueClasses[item.status]}`}>
              {item.due}
            </p>
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/10 text-navy/50">
              <Phone size={13} aria-hidden="true" />
            </span>
          </div>
        ))}
      </div>

      {/* Concept footer — explains the mechanism, no statistics */}
      <div className="m-4 flex items-center gap-3 rounded-xl bg-mist/70 p-3.5">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white text-brand shadow-card">
          <Gauge size={16} aria-hidden="true" />
        </span>
        <p className="text-[11px] leading-relaxed text-navy/55">
          Reminders are generated from{" "}
          <span className="font-bold text-navy">service history and KM readings</span> — no manual tracking
          needed.
        </p>
      </div>
    </div>
  );
}
