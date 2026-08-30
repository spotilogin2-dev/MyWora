import { Building2, Palette, ShieldCheck, UserPlus } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";

const sections: {
  icon: LucideIcon;
  title: string;
  description: string;
  status: string;
  to?: string;
}[] = [
  {
    icon: ShieldCheck,
    title: "Platform Admins",
    description: "Manage who can access the Super Admin console.",
    status: "Available",
    to: "/super-admin/admins",
  },
  {
    icon: UserPlus,
    title: "Registration & Invitations",
    description: "Control how workshops sign up and join the platform.",
    status: "Phase 4",
  },
  {
    icon: Building2,
    title: "Authentication & Security",
    description: "Sign-in policies, sessions and console access.",
    status: "Phase 5",
  },
  {
    icon: Palette,
    title: "Platform Branding",
    description: "Public-facing brand assets for MyWora itself.",
    status: "Phase 18",
  },
];

export default function Settings() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Settings"
        description="Console and platform configuration. Sections unlock phase by phase."
      />

      <Card>
        <ul className="divide-y divide-navy/[0.06]">
          {sections.map((section) => (
            <li key={section.title} className="flex items-center gap-4 p-5">
              <span className="icon-tile h-10 w-10 rounded-lg bg-navy/[0.05] text-navy/60">
                <section.icon size={18} aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-navy">{section.title}</p>
                <p className="mt-0.5 text-[13px] text-navy/50">{section.description}</p>
              </div>
              {section.to ? (
                <a
                  href={section.to}
                  className="shrink-0 text-[13px] font-bold text-brand transition-colors hover:text-brand-600"
                >
                  Manage
                </a>
              ) : (
                <Badge tone="neutral" className="shrink-0">
                  {section.status}
                </Badge>
              )}
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
