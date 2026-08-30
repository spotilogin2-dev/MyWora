import { useId } from "react";
import { Check, ChevronDown, Info } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { BUSINESS_TYPES, COUNTRY_DIAL_CODES } from "@/lib/registration";
import type { RegistrationErrors, RegistrationForm, SubdomainStatus } from "@/lib/registration";
import SubdomainField from "./SubdomainField";

const SUBDOMAIN_GUIDELINES = [
  "Lowercase letters (a-z)",
  "No spaces or special characters",
  "Numbers (0-9)",
  "3-30 characters",
  "Hyphens (-) allowed",
  "Must be unique",
];

interface StepBusinessInfoProps {
  form: RegistrationForm;
  errors: RegistrationErrors;
  subdomainStatus: SubdomainStatus;
  subdomainMessage: string | null;
  onFieldChange: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => void;
  onCheckSubdomain: () => void;
  onContinue: () => void;
}

/** Dial code + national number composite, styled to match the Input primitive. */
function PhoneField({
  dial,
  value,
  error,
  onDialChange,
  onValueChange,
}: {
  dial: string;
  value: string;
  error?: string;
  onDialChange: (dial: string) => void;
  onValueChange: (value: string) => void;
}) {
  const id = useId();
  const hintId = `${id}-hint`;
  const errorId = `${id}-error`;
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-navy">
        Phone Number <span className="ml-0.5 text-danger-500">*</span>
      </label>
      <div className="flex">
        <div className="relative w-[84px] shrink-0">
          <select
            aria-label="Country dial code"
            value={dial}
            onChange={(event) => onDialChange(event.target.value)}
            className="h-11 w-full appearance-none rounded-l-xl border border-r-0 border-navy/15 bg-mist/50 pl-3.5 pr-7 text-sm font-semibold text-navy transition-colors focus:border-brand/50 focus:outline-none focus:ring-2 focus:ring-brand/30"
          >
            {COUNTRY_DIAL_CODES.map((country) => (
              <option key={country.code} value={country.dial}>
                {country.dial}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            aria-hidden="true"
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-navy/35"
          />
        </div>
        <input
          id={id}
          type="tel"
          inputMode="tel"
          autoComplete="tel-national"
          placeholder="Enter phone number"
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : hintId}
          className={cn(
            "h-11 min-w-0 flex-1 rounded-r-xl border bg-white px-3.5 text-sm text-navy shadow-card transition-colors placeholder:text-navy/35",
            "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50",
            error ? "border-danger-400 focus:border-danger-500 focus:ring-danger-500/20" : "border-navy/15",
          )}
        />
      </div>
      {error ? (
        <p id={errorId} role="alert" className="text-xs font-bold text-danger-600">
          {error}
        </p>
      ) : (
        <p id={hintId} className="text-xs text-navy/45">
          We'll use this to contact you
        </p>
      )}
    </div>
  );
}

/** Step 1 — Business Information. */
export default function StepBusinessInfo({
  form,
  errors,
  subdomainStatus,
  subdomainMessage,
  onFieldChange,
  onCheckSubdomain,
  onContinue,
}: StepBusinessInfoProps) {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-navy">Business Information</h2>
      <p className="mt-1.5 text-sm text-navy/55">
        Tell us about your workshop so we can create your workspace.
      </p>

      <form
        className="mt-7 space-y-6"
        noValidate
        onSubmit={(event) => {
          event.preventDefault();
          onContinue();
        }}
      >
        <div className="grid gap-x-6 gap-y-6 sm:grid-cols-2">
          <Input
            label="Business Name"
            required
            hint="Enter the official name of your workshop"
            placeholder="Enter your business name"
            autoComplete="organization"
            value={form.businessName}
            onChange={(event) => onFieldChange("businessName", event.target.value)}
            error={errors.businessName}
          />
          <Select
            label="Business Type"
            required
            hint="Select the type of business"
            placeholder="Select business type"
            options={BUSINESS_TYPES.map((type) => ({ value: type, label: type }))}
            value={form.businessType}
            onChange={(event) => onFieldChange("businessType", event.target.value)}
            error={errors.businessType}
          />

          <PhoneField
            dial={form.countryCode}
            value={form.phone}
            error={errors.phone}
            onDialChange={(dial) => onFieldChange("countryCode", dial)}
            onValueChange={(value) => onFieldChange("phone", value)}
          />

          <Input
            label="City"
            required
            hint="Your workshop city"
            placeholder="Enter your city"
            autoComplete="address-level2"
            value={form.city}
            onChange={(event) => onFieldChange("city", event.target.value)}
            error={errors.city}
          />
        </div>

        <SubdomainField
          value={form.subdomain}
          error={errors.subdomain}
          status={subdomainStatus}
          statusMessage={subdomainMessage}
          onChange={(value) => onFieldChange("subdomain", value)}
          onCheck={onCheckSubdomain}
        />

        <div className="flex items-start gap-2.5 rounded-xl bg-brand-50 p-4">
          <Info size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
          <p className="text-[13px] font-semibold leading-relaxed text-brand-700">
            Choose a unique and easy to remember subdomain for your workshop.
          </p>
        </div>

        <div className="rounded-xl border border-navy/[0.06] bg-mist/40 p-5">
          <p className="text-sm font-bold text-navy">Subdomain Guidelines</p>
          <ul className="mt-3 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
            {SUBDOMAIN_GUIDELINES.map((item) => (
              <li key={item} className="flex items-center gap-2 text-[13px] font-semibold text-navy/65">
                <Check
                  size={14}
                  strokeWidth={2.75}
                  aria-hidden="true"
                  className="shrink-0 text-success-600"
                />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <Button type="submit" size="lg" className="w-full rounded-xl">
          Continue to Owner Account
        </Button>
      </form>
    </Card>
  );
}
