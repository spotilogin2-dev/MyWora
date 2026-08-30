/**
 * Static visual mockup of the MyWora workspace (Product Experience section).
 * Marketing content only — not real application data, not connected to a backend.
 */
import { Bell, Car, ChartColumn, LayoutDashboard, Settings, Users, Wallet } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const sidebarIcons: { icon: LucideIcon; active?: boolean }[] = [
  { icon: LayoutDashboard, active: true },
  { icon: Users },
  { icon: Car },
  { icon: Wallet },
  { icon: Bell },
  { icon: ChartColumn },
  { icon: Settings },
];

const recentCustomers = [
  { initials: "AR", name: "Ali Raza", vehicle: "Honda Civic · ABC-123" },
  { initials: "SM", name: "Sana Malik", vehicle: "Suzuki Vitara · KHI-220" },
  { initials: "BA", name: "Bilal Ahmed", vehicle: "Hyundai Tucson · ISB-708" },
];

const vehicleHistory = [
  { service: "Oil Change", km: "24,000 km", date: "Jan 12", current: true },
  { service: "Brake Pads", km: "21,400 km", date: "Nov 30", current: false },
  { service: "Wheel Alignment", km: "19,800 km", date: "Sep 08", current: false },
];

const followUps = [
  { service: "Oil Change — Honda Civic · ABC-123", status: "Due in 3 days", tone: "orange" as const },
  { service: "General Service — Suzuki Alto · LEB-456", status: "Overdue", tone: "red" as const },
];

const toneClasses = {
  orange: "bg-accent-50 text-accent-600",
  red: "bg-red-50 text-red-500",
};

export default function WorkspacePreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/[0.08] bg-white text-left shadow-float">
      {/* Browser chrome */}
      <div className="flex items-center gap-2 border-b border-navy/5 bg-mist/60 px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-navy/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy/10" />
        <span className="h-2.5 w-2.5 rounded-full bg-navy/10" />
        <span className="mx-auto rounded-full bg-white px-3 py-1 text-[10px] font-semibold text-navy/45">
          app.mywora.com/dashboard
        </span>
        <span className="w-12" aria-hidden="true" />
      </div>

      <div className="flex">
        {/* Icon sidebar */}
        <aside
          className="hidden w-14 shrink-0 flex-col items-center gap-2 border-r border-navy/5 py-4 sm:flex"
          aria-hidden="true"
        >
          {sidebarIcons.map((item, index) => (
            <span
              key={index}
              className={`grid h-8 w-8 place-items-center rounded-lg ${
                item.active ? "bg-brand text-white shadow-sm shadow-brand/30" : "bg-navy/[0.04] text-navy/45"
              }`}
            >
              <item.icon size={14} />
            </span>
          ))}
        </aside>

        <div className="min-w-0 flex-1 p-4 sm:p-6">
          {/* Money row — one blue card, as in the reference */}
          <div className="grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl bg-brand p-4 text-white shadow-card">
              <p className="text-[11px] font-bold uppercase tracking-wider text-white/65">Income</p>
              <p className="mt-1 text-xl font-extrabold tracking-tight">PKR 1,250,000</p>
              <p className="mt-1 text-[11px] font-semibold text-white/70">+12.5% this month</p>
            </div>
            <div className="rounded-xl border border-navy/[0.07] bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-navy/45">Expenses</p>
              <p className="mt-1 text-xl font-extrabold tracking-tight text-navy">PKR 450,000</p>
              <p className="mt-1 text-[11px] font-semibold text-danger-400">-8.2% this month</p>
            </div>
            <div className="rounded-xl border border-navy/[0.07] bg-white p-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-navy/45">Gross Profit</p>
              <p className="mt-1 text-xl font-extrabold tracking-tight text-navy">PKR 800,000</p>
              <p className="mt-1 text-[11px] font-semibold text-success-500">+9.4% this month</p>
            </div>
          </div>

          <div className="mt-3 grid gap-3 lg:grid-cols-[1.15fr_1fr]">
            {/* Customers panel */}
            <div className="rounded-xl border border-navy/[0.07] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold text-navy">Recent Customers</p>
                <span className="text-[11px] font-bold text-brand">View all</span>
              </div>
              <div className="mt-2">
                {recentCustomers.map((customer) => (
                  <div
                    key={customer.name}
                    className="flex items-center gap-3 border-b border-navy/5 py-2.5 last:border-0"
                  >
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand-50 text-[10px] font-extrabold text-brand-600">
                      {customer.initials}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-navy">{customer.name}</p>
                      <p className="truncate text-[11px] text-navy/45">{customer.vehicle}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle history panel */}
            <div className="rounded-xl border border-navy/[0.07] p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-extrabold text-navy">Vehicle History</p>
                <span className="rounded-full bg-mist/80 px-2 py-0.5 text-[10px] font-bold text-navy/55">
                  XYZ-789
                </span>
              </div>
              <div className="mt-3 flex flex-col gap-3.5 border-l-2 border-dashed border-navy/10 pl-4">
                {vehicleHistory.map((item) => (
                  <div key={item.service} className="relative">
                    <span
                      className={`absolute -left-[22px] top-1 h-2.5 w-2.5 rounded-full ring-4 ring-white ${
                        item.current ? "bg-brand" : "bg-navy/20"
                      }`}
                    />
                    <p className="text-xs font-bold text-navy">{item.service}</p>
                    <p className="text-[11px] text-navy/45">
                      {item.km} · {item.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Follow-ups panel */}
          <div className="mt-3 rounded-xl border border-navy/[0.07] p-4">
            <div className="flex items-center justify-between">
              <p className="text-xs font-extrabold text-navy">Upcoming Follow-Ups</p>
              <span className="rounded-full bg-accent-50 px-2 py-0.5 text-[10px] font-bold text-accent-600">
                2 this week
              </span>
            </div>
            <div className="mt-2">
              {followUps.map((item) => (
                <div
                  key={item.service}
                  className="flex items-center gap-3 border-b border-navy/5 py-2.5 last:border-0"
                >
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-accent-50 text-accent-600">
                    <Bell size={12} aria-hidden="true" />
                  </span>
                  <p className="min-w-0 flex-1 truncate text-xs font-semibold text-navy/75">{item.service}</p>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${toneClasses[item.tone]}`}
                  >
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
