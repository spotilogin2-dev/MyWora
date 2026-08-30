/**
 * Static visual mockup of the MyWora customer portal.
 * Marketing content only — not real application data, not connected to a backend.
 */
import { Car, Download, FileText } from "lucide-react";

const serviceHistory = [
  { service: "Oil Change", date: "Jan 12", amount: "PKR 8,500", status: "Paid", tone: "green" as const },
  { service: "Brake Service", date: "Nov 30", amount: "PKR 18,000", status: "Paid", tone: "green" as const },
  {
    service: "General Service",
    date: "Sep 08",
    amount: "PKR 6,200",
    status: "Completed",
    tone: "gray" as const,
  },
];

const statusClasses = {
  green: "bg-success-50 text-success-600",
  gray: "bg-navy/5 text-navy/45",
};

export default function PortalPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/[0.08] bg-white text-left shadow-float">
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-navy/5 px-5 py-4">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-brand-400 to-brand-600 text-xs font-extrabold text-white">
          AR
        </span>
        <div>
          <p className="text-sm font-extrabold text-navy">Ali Raza</p>
          <p className="text-[11px] text-navy/45">My Garage</p>
        </div>
        <span className="ml-auto rounded-full bg-success-50 px-2.5 py-1 text-[10px] font-bold text-success-600">
          Signed in
        </span>
      </div>

      <div className="p-5">
        {/* Vehicle card */}
        <div className="flex items-center gap-3 rounded-xl bg-mist/70 p-3.5">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white text-brand shadow-card">
            <Car size={18} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-extrabold text-navy">Toyota Corolla</p>
            <p className="text-[11px] text-navy/45">ABC-123 · Sedan</p>
          </div>
          <span className="ml-auto shrink-0 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-navy/60 shadow-card">
            24,300 km
          </span>
        </div>

        {/* Tabs */}
        <div className="mt-4 flex gap-5 border-b border-navy/5 text-xs font-bold">
          <span className="-mb-px border-b-2 border-brand pb-2.5 text-brand">Service History</span>
          <span className="pb-2.5 text-navy/40">Bills</span>
          <span className="pb-2.5 text-navy/40">Reminders</span>
        </div>

        {/* History rows */}
        <div>
          {serviceHistory.map((item) => (
            <div
              key={item.service}
              className="flex items-center gap-3 border-b border-navy/5 py-3 last:border-0"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-bold text-navy">{item.service}</p>
                <p className="text-[11px] text-navy/45">{item.date}</p>
              </div>
              <p className="text-[12px] font-extrabold text-navy">{item.amount}</p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold ${statusClasses[item.tone]}`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

        {/* Bill row */}
        <div className="mt-3 flex items-center gap-3 rounded-xl border border-dashed border-navy/15 p-3">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600">
            <FileText size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-[13px] font-bold text-navy">Invoice #1042</p>
            <p className="text-[11px] text-navy/45">PDF · 128 KB</p>
          </div>
          <span className="ml-auto grid h-8 w-8 shrink-0 place-items-center rounded-full border border-navy/10 text-navy/50">
            <Download size={13} aria-hidden="true" />
          </span>
        </div>
      </div>
    </div>
  );
}
