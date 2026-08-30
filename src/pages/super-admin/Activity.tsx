import { History } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const planned = [
  "Business sign-ups and registrations",
  "Plan and subscription changes",
  "Admin actions on workshop accounts",
  "Suspensions and reinstatements",
];

export default function Activity() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Activity"
        description="The platform audit trail arrives in Phase 22 (Notifications + Audit Logs)."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planned coverage</CardTitle>
            <CardDescription>Events the audit log will record.</CardDescription>
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
            icon={History}
            title="No activity yet"
            description="Platform events appear here once the audit log is wired up."
          />
        </Card>
      </div>
    </div>
  );
}
