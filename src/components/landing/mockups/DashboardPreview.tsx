/**
 * Static visual mockup of the MyWora workshop dashboard.
 * All values are illustrative marketing content only — NOT real application
 * data and not connected to any backend or database.
 */
import {
  Bell,
  Briefcase,
  Car,
  ChartColumn,
  ChevronDown,
  CirclePlus,
  ClipboardList,
  LayoutDashboard,
  Search,
  Settings,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface SidebarItem {
  icon: LucideIcon;
  label: string;
  active?: boolean;
}

const sidebarItems: SidebarItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: CirclePlus, label: "New Entry" },
  { icon: Users, label: "Customers" },
  { icon: Car, label: "Vehicles" },
  { icon: Bell, label: "Follow-Ups" },
  { icon: ClipboardList, label: "Lead Sheet" },
  { icon: Briefcase, label: "Employees" },
  { icon: ChartColumn, label: "Reports" },
  { icon: Settings, label: "Settings" },
];

interface StatTop {
  label: string;
  value: string;
  delta?: string;
  tone?: "up" | "down";
  chip?: string;
}

const statsTop: StatTop[] = [
  { label: "Total Income", value: "PKR 1,250,000", delta: "+12.5%", tone: "up" },
  { label: "Total Expenses", value: "PKR 450,000", delta: "-8.2%", tone: "down" },
  { label: "Gross Profit", value: "PKR 800,000", delta: "+9.4%", tone: "up" },
  { label: "Follow-Ups", value: "32", chip: "Due Soon" },
];

const statsBottom: { label: string; value: string; chip?: string }[] = [
  { label: "Customers", value: "1,248" },
  { label: "Vehicles", value: "1,876" },
  { label: "Service Entries", value: "3,246" },
  { label: "This Month", value: "256", chip: "Entries" },
];

const recentEntries = [
  {
    name: "Ali Raza",
    vehicle: "Honda Civic",
    plate: "ABC-123",
    service: "Oil Change",
    amount: "PKR 15,500",
    date: "Today",
  },
  {
    name: "Usman Khan",
    vehicle: "Toyota Corolla",
    plate: "XYZ-789",
    service: "Brake Service",
    amount: "PKR 22,000",
    date: "Today",
  },
  {
    name: "Hassan Ali",
    vehicle: "Suzuki Alto",
    plate: "LEB-456",
    service: "General Service",
    amount: "PKR 7,500",
    date: "Yesterday",
  },
];

export default function DashboardPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-navy/[0.08] bg-white shadow-float">
      {/* Top bar */}
      <div className="flex items-center gap-2.5 border-b border-navy/5 px-4 py-2.5">
        <svg width="18" height="18" viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M5.5 9.5 11 23l5-9.5L21 23l5.5-13.5"
            stroke="#FF6A32"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="text-xs font-extrabold tracking-tight text-navy">MyWora</span>
        <div className="ml-1 hidden h-7 min-w-0 flex-1 items-center gap-1.5 rounded-full bg-mist/80 px-3 text-navy/40 md:flex">
          <Search size={11} aria-hidden="true" />
          <span className="truncate text-[10px] font-medium">Search customers, vehicles, services…</span>
        </div>
        <span className="relative ml-auto md:ml-0">
          <Bell size={13} className="text-navy/50" aria-hidden="true" />
          <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-accent-500" />
        </span>
        <span className="grid h-6 w-6 place-items-center rounded-full bg-brand-100 text-[9px] font-bold text-brand-700">
          FA
        </span>
        <span className="hidden items-center gap-1 text-[10px] font-bold text-navy/70 sm:flex">
          FA Auto <ChevronDown size={10} aria-hidden="true" />
        </span>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-40 shrink-0 flex-col border-r border-navy/5 p-2.5 sm:flex">
          <nav className="flex flex-col gap-0.5" aria-hidden="true">
            {sidebarItems.map((item) => (
              <span
                key={item.label}
                className={`flex items-center gap-2 rounded-lg px-2.5 py-[7px] text-[11px] font-semibold ${
                  item.active ? "bg-brand text-white shadow-sm shadow-brand/30" : "text-navy/55"
                }`}
              >
                <item.icon size={12} />
                {item.label}
              </span>
            ))}
          </nav>
          <span className="mt-auto flex items-center gap-2 rounded-lg border border-navy/[0.07] p-2">
            <span className="grid h-5 w-5 place-items-center rounded-md bg-accent-500 text-[8px] font-bold text-white">
              FA
            </span>
            <span className="truncate text-[10px] font-bold text-navy/70">FA Auto</span>
            <ChevronDown size={10} className="ml-auto text-navy/40" aria-hidden="true" />
          </span>
        </aside>

        {/* Main panel */}
        <div className="min-w-0 flex-1 p-3.5 sm:p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-extrabold text-navy">Dashboard</p>
            <span className="flex items-center gap-1 rounded-full bg-mist/80 px-2.5 py-1 text-[9px] font-bold text-navy/55">
              This Week <ChevronDown size={9} aria-hidden="true" />
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {statsTop.map((stat) => (
              <div key={stat.label} className="rounded-xl border border-navy/[0.07] p-2.5">
                <p className="truncate text-[9px] font-semibold text-navy/45">{stat.label}</p>
                <p className="mt-0.5 truncate text-[12px] font-extrabold tracking-tight text-navy sm:text-[13px]">
                  {stat.value}
                </p>
                {stat.delta && stat.tone ? (
                  <p
                    className={`mt-0.5 text-[9px] font-bold ${
                      stat.tone === "up" ? "text-success-500" : "text-danger-400"
                    }`}
                  >
                    {stat.delta} vs last month
                  </p>
                ) : (
                  <span className="mt-1 inline-block rounded-full bg-accent-50 px-1.5 py-[2px] text-[8px] font-bold text-accent-600">
                    {stat.chip}
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-2.5 grid grid-cols-2 gap-2 rounded-xl bg-mist/50 p-2.5 sm:grid-cols-4">
            {statsBottom.map((stat) => (
              <div key={stat.label} className="px-1">
                <p className="truncate text-[9px] font-semibold text-navy/45">{stat.label}</p>
                <p className="mt-0.5 flex items-baseline gap-1 text-[13px] font-extrabold text-navy">
                  {stat.value}
                  {stat.chip && (
                    <span className="rounded-full bg-white px-1.5 py-[1px] text-[8px] font-bold text-navy/45">
                      {stat.chip}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[11px] font-extrabold text-navy">Recent Service Entries</p>
              <span className="text-[10px] font-bold text-brand">View All Entries →</span>
            </div>
            <div className="mt-1">
              {recentEntries.map((entry) => (
                <div
                  key={entry.plate}
                  className="grid grid-cols-[1fr_auto] items-center gap-2 border-b border-navy/5 py-2 last:border-0 sm:grid-cols-[1.1fr_0.8fr_0.9fr_0.9fr_auto]"
                >
                  <div className="min-w-0">
                    <p className="truncate text-[10px] font-bold text-navy">{entry.name}</p>
                    <p className="truncate text-[9px] text-navy/40">{entry.vehicle}</p>
                  </div>
                  <p className="hidden truncate text-[10px] font-semibold text-navy/60 sm:block">
                    {entry.plate}
                  </p>
                  <p className="hidden truncate text-[10px] text-navy/60 sm:block">{entry.service}</p>
                  <p className="hidden text-right text-[10px] font-bold text-navy sm:block">{entry.amount}</p>
                  <p className="text-right text-[9px] font-semibold text-navy/40">{entry.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
