import { ShieldCheck, UserPlus } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";

const planned = [
  "Invite admins by email",
  "Roles: Super Admin and Support",
  "Last-login activity",
  "Grant or revoke console access",
];

export default function Admins() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Platform Admins"
        description="Manage who can access the Super Admin console."
        actions={
          <Button disabled title="Invitations arrive with authentication (Phase 5)">
            <UserPlus size={16} aria-hidden="true" />
            Invite Admin
          </Button>
        }
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Planned capabilities</CardTitle>
            <CardDescription>Admin management activates in Phase 5.</CardDescription>
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

        <EmptyState
          icon={ShieldCheck}
          title="No platform admins yet"
          description="Admin accounts will be created and managed here once authentication is live in Phase 5."
        />
      </div>
    </div>
  );
}
