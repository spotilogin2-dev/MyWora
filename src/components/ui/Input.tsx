import { forwardRef, useId } from "react";
import type { InputHTMLAttributes } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/cn";

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hint?: string;
  error?: string;
  leadingIcon?: LucideIcon;
  containerClassName?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leadingIcon: LeadingIcon, containerClassName, className, id, required, ...rest },
  ref,
) {
  const autoId = useId();
  const fieldId = id ?? autoId;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const describedBy = [hint ? hintId : null, error ? errorId : null].filter(Boolean).join(" ") || undefined;

  return (
    <div className={cn("flex w-full flex-col gap-1.5", containerClassName)}>
      {label && (
        <label htmlFor={fieldId} className="text-sm font-bold text-navy">
          {label}
          {required && <span className="ml-0.5 text-danger-500">*</span>}
        </label>
      )}
      <div className="relative">
        {LeadingIcon && (
          <LeadingIcon
            size={16}
            aria-hidden="true"
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-navy/35"
          />
        )}
        <input
          ref={ref}
          id={fieldId}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(
            "h-11 w-full rounded-xl border bg-white px-3.5 text-sm text-navy shadow-card transition-colors placeholder:text-navy/35",
            "focus:outline-none focus:ring-2 focus:ring-brand/30 focus:border-brand/50",
            "disabled:cursor-not-allowed disabled:bg-mist/60 disabled:text-navy/40",
            LeadingIcon && "pl-10",
            error ? "border-danger-400 focus:border-danger-500 focus:ring-danger-500/20" : "border-navy/15",
            className,
          )}
          {...rest}
        />
      </div>
      {hint && !error && (
        <p id={hintId} className="text-xs text-navy/45">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="text-xs font-bold text-danger-600">
          {error}
        </p>
      )}
    </div>
  );
});

export default Input;
