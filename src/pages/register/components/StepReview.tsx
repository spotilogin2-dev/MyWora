import type { ReactNode } from "react";
import { Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { formatWorkspaceUrl } from "@/lib/registration";
import type { RegistrationErrors, RegistrationForm, RegistrationStep } from "@/lib/registration";

interface StepReviewProps {
  form: RegistrationForm;
  errors: RegistrationErrors;
  onFieldChange: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => void;
  onEditStep: (step: RegistrationStep) => void;
  onFinish: () => void;
}

function ReviewRow({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="flex items-baseline justify-between gap-6 py-2">
      <dt className="shrink-0 text-[13px] font-semibold text-navy/50">{label}</dt>
      <dd className={cn("text-right text-sm font-bold break-all", accent ? "text-brand" : "text-navy")}>
        {value}
      </dd>
    </div>
  );
}

function ReviewSection({
  title,
  step,
  onEditStep,
  children,
}: {
  title: string;
  step: RegistrationStep;
  onEditStep: (step: RegistrationStep) => void;
  children: ReactNode;
}) {
  return (
    <section className="p-5 sm:p-6">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-bold text-navy">{title}</h3>
        <button
          type="button"
          onClick={() => onEditStep(step)}
          className="focus-ring inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[13px] font-bold text-brand transition-colors hover:bg-brand-50"
        >
          <Pencil size={13} aria-hidden="true" />
          Edit
        </button>
      </div>
      <dl className="mt-3 divide-y divide-navy/[0.05]">{children}</dl>
    </section>
  );
}

/** Step 3 — Review & Confirm. */
export default function StepReview({ form, errors, onFieldChange, onEditStep, onFinish }: StepReviewProps) {
  return (
    <Card className="overflow-hidden">
      <div className="p-6 pb-5 sm:p-8 sm:pb-5">
        <h2 className="text-xl font-bold tracking-tight text-navy">Review &amp; Confirm</h2>
        <p className="mt-1.5 text-sm text-navy/55">Double-check your details before finishing setup.</p>
      </div>

      <div className="divide-y divide-navy/[0.06] border-y border-navy/[0.06]">
        <ReviewSection title="Workshop" step={1} onEditStep={onEditStep}>
          <ReviewRow label="Business Name" value={form.businessName.trim()} />
          <ReviewRow label="Business Type" value={form.businessType} />
          <ReviewRow label="Phone Number" value={`${form.countryCode} ${form.phone.trim()}`} />
          <ReviewRow label="City" value={form.city.trim()} />
          <ReviewRow label="Workspace URL" value={formatWorkspaceUrl(form.subdomain)} accent />
        </ReviewSection>

        <ReviewSection title="Owner Account" step={2} onEditStep={onEditStep}>
          <ReviewRow label="Full Name" value={form.ownerName.trim()} />
          <ReviewRow label="Email Address" value={form.ownerEmail.trim()} />
        </ReviewSection>
      </div>

      <form
        className="p-6 sm:p-8"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onFinish();
        }}
      >
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy/10 bg-white p-4 transition-colors hover:border-brand/40">
          <input
            type="checkbox"
            checked={form.confirmAccurate}
            onChange={(event) => onFieldChange("confirmAccurate", event.target.checked)}
            className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
          />
          <span className="text-[13px] leading-relaxed text-navy/65">
            I confirm the information above is accurate and I'm authorized to set up this workspace.
          </span>
        </label>
        {errors.confirmAccurate && (
          <p role="alert" className="mt-1.5 text-xs font-bold text-danger-600">
            {errors.confirmAccurate}
          </p>
        )}

        <Button type="submit" size="lg" className="mt-6 w-full rounded-xl">
          Confirm &amp; Finish Setup
        </Button>
      </form>
    </Card>
  );
}
