import { useId, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { passwordScore } from "@/lib/registration";
import type { RegistrationErrors, RegistrationForm } from "@/lib/registration";

const STRENGTH_LEVELS = [
  { max: 1, label: "Weak", bar: "bg-danger-500", text: "text-danger-600" },
  { max: 2, label: "Fair", bar: "bg-warning-500", text: "text-warning-600" },
  { max: 3, label: "Good", bar: "bg-brand", text: "text-brand" },
  { max: 5, label: "Strong", bar: "bg-success-500", text: "text-success-600" },
] as const;

function strengthFor(score: number) {
  return STRENGTH_LEVELS.find((level) => score <= level.max) ?? STRENGTH_LEVELS[STRENGTH_LEVELS.length - 1];
}

function PasswordStrengthMeter({ value }: { value: string }) {
  const score = passwordScore(value);
  const level = strengthFor(score);
  const filled = Math.min(score, 4);
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex flex-1 gap-1" aria-hidden="true">
        {[0, 1, 2, 3].map((index) => (
          <span
            key={index}
            className={cn(
              "h-1 flex-1 rounded-full transition-colors",
              index < filled ? level.bar : "bg-navy/10",
            )}
          />
        ))}
      </div>
      <span aria-live="polite" className={cn("text-[11px] font-bold", level.text)}>
        {level.label}
      </span>
    </div>
  );
}

function PasswordField({
  label,
  placeholder,
  value,
  error,
  autoComplete,
  onChange,
}: {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  autoComplete: string;
  onChange: (value: string) => void;
}) {
  const [visible, setVisible] = useState(false);
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-navy">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          autoComplete={autoComplete}
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cn(
            "h-11 w-full rounded-xl border bg-white px-3.5 pr-11 text-sm text-navy shadow-card transition-colors placeholder:text-navy/35",
            "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50",
            error ? "border-danger-400 focus:border-danger-500 focus:ring-danger-500/20" : "border-navy/15",
          )}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="focus-ring absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy"
        >
          {visible ? <EyeOff size={16} aria-hidden="true" /> : <Eye size={16} aria-hidden="true" />}
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="text-xs font-bold text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
}

interface StepOwnerAccountProps {
  form: RegistrationForm;
  errors: RegistrationErrors;
  onFieldChange: <K extends keyof RegistrationForm>(field: K, value: RegistrationForm[K]) => void;
  onContinue: () => void;
}

/** Step 2 — Owner Account. */
export default function StepOwnerAccount({ form, errors, onFieldChange, onContinue }: StepOwnerAccountProps) {
  return (
    <Card className="p-6 sm:p-8">
      <h2 className="text-xl font-bold tracking-tight text-navy">Owner Account</h2>
      <p className="mt-1.5 text-sm text-navy/55">Create the account that will manage your workshop.</p>

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
            label="Full Name"
            required
            hint="Your name as the workshop owner"
            placeholder="Enter your full name"
            autoComplete="name"
            value={form.ownerName}
            onChange={(event) => onFieldChange("ownerName", event.target.value)}
            error={errors.ownerName}
          />
          <Input
            label="Email Address"
            required
            type="email"
            hint="We'll send account confirmations here"
            placeholder="you@company.com"
            autoComplete="email"
            value={form.ownerEmail}
            onChange={(event) => onFieldChange("ownerEmail", event.target.value)}
            error={errors.ownerEmail}
          />
        </div>

        <div className="space-y-2">
          <PasswordField
            label="Password"
            placeholder="Create a strong password"
            autoComplete="new-password"
            value={form.ownerPassword}
            error={errors.ownerPassword}
            onChange={(value) => onFieldChange("ownerPassword", value)}
          />
          {form.ownerPassword && !errors.ownerPassword && (
            <PasswordStrengthMeter value={form.ownerPassword} />
          )}
        </div>

        <PasswordField
          label="Confirm Password"
          placeholder="Re-enter your password"
          autoComplete="new-password"
          value={form.ownerPasswordConfirm}
          error={errors.ownerPasswordConfirm}
          onChange={(value) => onFieldChange("ownerPasswordConfirm", value)}
        />

        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border border-navy/10 bg-white p-4 transition-colors hover:border-brand/40">
            <input
              type="checkbox"
              checked={form.agreeTerms}
              onChange={(event) => onFieldChange("agreeTerms", event.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-brand"
            />
            <span className="text-[13px] leading-relaxed text-navy/65">
              I agree to MyWora's <span className="font-bold text-navy">Terms of Service</span> and{" "}
              <span className="font-bold text-navy">Privacy Policy</span>.
            </span>
          </label>
          {errors.agreeTerms && (
            <p role="alert" className="mt-1.5 text-xs font-bold text-danger-600">
              {errors.agreeTerms}
            </p>
          )}
        </div>

        <Button type="submit" size="lg" className="w-full rounded-xl">
          Continue to Review
        </Button>
      </form>
    </Card>
  );
}
