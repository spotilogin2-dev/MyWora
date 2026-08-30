import { BarChart3 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const planned = [
  "Platform growth — businesses, customers, vehicles",
  "Revenue — income, expenses and net profit",
  "Plan adoption and subscription health",
  "Service volume across workshops",
];

export default function Analytics() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Analytics"
        description="Platform-wide analytics unlock in Phase 19 (Reports + Analytics), once businesses generate real data."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planned dashboards</CardTitle>
            <CardDescription>What the analytics section will cover.</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="flex flex-col gap-3">
              {planned.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm font-semibold text-navy/75">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="flex items-center justify-center">
          <EmptyState
            variant="plain"
            icon={BarChart3}
            title="No analytics yet"
            description="Charts populate automatically once businesses and service data exist on the platform."
          />
        </Card>
      </div>
    </div>
  );
}
