import { useMemo, useState } from "react";
import { Building2, ChevronLeft, ChevronRight, Search } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import Select from "@/components/ui/Select";
import { PLATFORM_PLANS } from "@/config/platform-plans";

type BusinessStatus = "active" | "trial" | "suspended";

export interface BusinessRow {
  id: string;
  name: string;
  owner: string;
  plan: string;
  status: BusinessStatus;
  customers: number;
  vehicles: number;
  serviceEntries: number;
  createdAt: string;
}

/**
 * Businesses live in the database (Phase 6). This list is intentionally
 * empty — no demo records are generated anywhere in the console.
 */
const BUSINESSES: BusinessRow[] = [];

const COLUMNS = [
  "Business Name",
  "Owner",
  "Plan",
  "Status",
  "Customers",
  "Vehicles",
  "Service Entries",
  "Created At",
  "Actions",
];

const PLAN_OPTIONS = [
  { value: "all", label: "All Plans" },
  ...PLATFORM_PLANS.map((plan) => ({ value: plan.name, label: plan.name })),
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "active", label: "Active" },
  { value: "trial", label: "Trial" },
  { value: "suspended", label: "Suspended" },
];

const PAGE_SIZE_OPTIONS = [
  { value: "10", label: "10 / page" },
  { value: "25", label: "25 / page" },
  { value: "50", label: "50 / page" },
];

const statusBadgeTone: Record<BusinessStatus, "success" | "warning" | "danger"> = {
  active: "success",
  trial: "warning",
  suspended: "danger",
};

const statusLabel: Record<BusinessStatus, string> = {
  active: "Active",
  trial: "Trial",
  suspended: "Suspended",
};

export default function BusinessesTableCard({ title = "Businesses Overview" }: { title?: string }) {
  const [query, setQuery] = useState("");
  const [plan, setPlan] = useState("all");
  const [status, setStatus] = useState("all");
  const [pageSize, setPageSize] = useState("10");

  // Fully functional filtering — ready for real rows the moment Phase 6 connects.
  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return BUSINESSES.filter((business) => {
      const matchesQuery =
        business.name.toLowerCase().includes(needle) || business.owner.toLowerCase().includes(needle);
      const matchesPlan = plan === "all" || business.plan === plan;
      const matchesStatus = status === "all" || business.status === status;
      return matchesQuery && matchesPlan && matchesStatus;
    });
  }, [query, plan, status]);

  const total = BUSINESSES.length;
  const rangeStart = filtered.length === 0 ? 0 : 1;

  return (
    <Card>
      {/* Header + toolbar */}
      <div className="flex flex-col gap-4 border-b border-navy/[0.06] p-5 xl:flex-row xl:items-center xl:justify-between">
        <h2 className="text-base font-extrabold text-navy">{title}</h2>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative w-full sm:w-60">
            <Search
              size={15}
              aria-hidden="true"
              className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/35"
            />
            <input
              type="search"
              aria-label="Search businesses"
              placeholder="Search businesses..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="h-10 w-full rounded-lg border border-navy/10 bg-white pl-9 pr-3.5 text-sm text-navy transition-colors placeholder:text-navy/35 focus:border-brand/40 focus:outline-none focus:ring-2 focus:ring-brand/20"
            />
          </div>
          <Select
            aria-label="Filter by plan"
            options={PLAN_OPTIONS}
            value={plan}
            onChange={(event) => setPlan(event.target.value)}
            containerClassName="w-full sm:w-[132px]"
            className="h-10 rounded-lg text-[13px]"
          />
          <Select
            aria-label="Filter by status"
            options={STATUS_OPTIONS}
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            containerClassName="w-full sm:w-[132px]"
            className="h-10 rounded-lg text-[13px]"
          />
          <Button
            disabled
            title="Business creation connects to the database in Phase 6"
            className="h-10 rounded-lg px-5"
          >
            Add Business
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-sm">
          <thead>
            <tr className="border-b border-navy/[0.06] text-xs font-semibold text-navy/45">
              {COLUMNS.map((column) => (
                <th key={column} scope="col" className="whitespace-nowrap px-5 py-3.5">
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((business) => (
              <tr key={business.id} className="border-b border-navy/[0.05] last:border-0">
                <td className="px-5 py-4 font-bold text-navy">{business.name}</td>
                <td className="px-5 py-4 text-navy/60">{business.owner}</td>
                <td className="px-5 py-4 text-navy/60">{business.plan}</td>
                <td className="px-5 py-4">
                  <Badge tone={statusBadgeTone[business.status]}>{statusLabel[business.status]}</Badge>
                </td>
                <td className="px-5 py-4 text-navy/60">{business.customers}</td>
                <td className="px-5 py-4 text-navy/60">{business.vehicles}</td>
                <td className="px-5 py-4 text-navy/60">{business.serviceEntries}</td>
                <td className="whitespace-nowrap px-5 py-4 text-navy/45">{business.createdAt}</td>
                <td className="px-5 py-4 text-right text-navy/45">
                  {/* Row actions arrive with Phase 6 data. */}
                  <span aria-hidden="true">—</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-5 pb-6 pt-2">
            <EmptyState
              variant="plain"
              icon={Building2}
              title="No businesses yet"
              description="Businesses that sign up on MyWora will appear here."
            />
          </div>
        )}
      </div>

      {/* Footer: result count + pagination chrome (real pagination lands with Phase 6) */}
      <div className="flex flex-col gap-4 border-t border-navy/[0.06] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[13px] text-navy/50">
          Showing {rangeStart} to {filtered.length} of {total} results
        </p>
        <div className="flex items-center gap-2">
          <button
            type="button"
            aria-label="Previous page"
            disabled
            className="grid h-9 w-9 place-items-center rounded-lg border border-navy/10 text-navy/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronLeft size={15} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Page 1"
            aria-current="page"
            className="grid h-9 w-9 place-items-center rounded-lg border border-brand text-[13px] font-bold text-brand"
          >
            1
          </button>
          <button
            type="button"
            aria-label="Next page"
            disabled
            className="grid h-9 w-9 place-items-center rounded-lg border border-navy/10 text-navy/40 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <ChevronRight size={15} aria-hidden="true" />
          </button>
          <Select
            aria-label="Rows per page"
            options={PAGE_SIZE_OPTIONS}
            value={pageSize}
            onChange={(event) => setPageSize(event.target.value)}
            containerClassName="w-[110px]"
            className="ml-1 h-9 rounded-lg text-[13px]"
          />
        </div>
      </div>
    </Card>
  );
}
