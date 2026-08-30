import { LifeBuoy } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const planned = [
  "Ticketed support inbox for platform admins",
  "Escalation workflows for business support",
  "Knowledge base and help-center management",
];

export default function Support() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Support"
        description="Support tooling for the Super Admin console arrives in a later phase. Contact details will be published here once support goes live."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planned capabilities</CardTitle>
            <CardDescription>What the support workspace will include.</CardDescription>
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
            icon={LifeBuoy}
            title="No support channels yet"
            description="Support requests and tools will appear here when the system goes live."
          />
        </Card>
      </div>
    </div>
  );
}
