import { Check, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { formatWorkspaceUrl } from "@/lib/registration";
import type { RegistrationForm } from "@/lib/registration";

interface SuccessScreenProps {
  form: RegistrationForm;
  onReset: () => void;
}

/**
 * Terminal state of the Phase 4 wizard. Honest by design: nothing was stored —
 * provisioning goes live with Authentication (Phase 5) and the Database (Phase 6).
 */
export default function SuccessScreen({ form, onReset }: SuccessScreenProps) {
  return (
    <Card className="p-8 text-center sm:p-10">
      <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-success-50 text-success-600">
        <Check size={26} strokeWidth={2.5} aria-hidden="true" />
      </div>
      <h2 className="mt-5 text-2xl font-bold tracking-tight text-navy sm:text-3xl">
        Workspace Setup Complete!
      </h2>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-navy/60">
        <span className="font-bold text-navy">{form.businessName.trim()}</span> is ready to join MyWora. Your
        workspace will live at{" "}
        <span className="font-bold text-brand">{formatWorkspaceUrl(form.subdomain)}</span>.
      </p>

      <div className="mx-auto mt-6 flex max-w-md items-start gap-2.5 rounded-xl bg-brand-50 p-4 text-left">
        <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
        <p className="text-[13px] leading-relaxed text-brand-700">
          This is the Phase 4 preview build — your details were validated locally and are not stored yet.
          Account creation, email verification and workspace provisioning go live with Authentication &amp;
          Database (Phases 5–6).
        </p>
      </div>

      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Button to="/" size="lg">
          Back to Home
        </Button>
        <Button variant="outline" size="lg" onClick={onReset} withArrow={false}>
          Register Another Workshop
        </Button>
      </div>
    </Card>
  );
}
