import { useId } from "react";
import { Check } from "lucide-react";
import Button from "@/components/ui/Button";
import Spinner from "@/components/ui/Spinner";
import { cn } from "@/lib/cn";
import { SUBDOMAIN_DOMAIN, normalizeSubdomain, validateSubdomainFormat } from "@/lib/registration";
import type { SubdomainStatus } from "@/lib/registration";

interface SubdomainFieldProps {
  value: string;
  error?: string;
  status: SubdomainStatus;
  statusMessage: string | null;
  onChange: (value: string) => void;
  onCheck: () => void;
}

const HINT = "This will be your workshop's unique URL";

/**
 * Composite subdomain input: `https://` prefix + input + `.mywora.com` suffix
 * with a live availability status. Availability is checked client-side against
 * the reserved list — final uniqueness is confirmed at provisioning (Phase 6).
 */
export default function SubdomainField({
  value,
  error,
  status,
  statusMessage,
  onChange,
  onCheck,
}: SubdomainFieldProps) {
  const id = useId();
  const messageId = `${id}-message`;

  const formatError = validateSubdomainFormat(value);
  const checking = status === "checking";
  const available = status === "available";
  const reserved = status === "reserved";

  let message: string | null = null;
  let tone: "error" | "success" | "info" = "info";
  if (error) {
    message = error;
    tone = "error";
  } else if (reserved && statusMessage) {
    message = statusMessage;
    tone = "error";
  } else if (available) {
    message = `${normalizeSubdomain(value)}.${SUBDOMAIN_DOMAIN} is ready to reserve — final uniqueness is confirmed when your workspace is created.`;
    tone = "success";
  } else if (checking) {
    message = "Checking availability…";
    tone = "info";
  }

  return (
    <div className="flex w-full flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-bold text-navy">
        Choose Your Subdomain <span className="ml-0.5 text-danger-500">*</span>
      </label>

      <div className="flex flex-col gap-2 sm:flex-row">
        <div
          className={cn(
            "flex h-11 min-w-0 flex-1 items-stretch overflow-hidden rounded-xl border bg-white shadow-card transition-colors focus-within:ring-2",
            error || reserved
              ? "border-danger-400 focus-within:border-danger-500 focus-within:ring-danger-500/20"
              : "border-navy/15 focus-within:border-brand/50 focus-within:ring-brand/30",
          )}
        >
          <span
            aria-hidden="true"
            className="grid shrink-0 place-items-center border-r border-navy/[0.08] bg-mist/50 px-3 text-sm font-semibold text-navy/45"
          >
            https://
          </span>
          <input
            id={id}
            type="text"
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            placeholder="Enter your preferred subdomain"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            aria-invalid={error || reserved ? true : undefined}
            aria-describedby={message ? messageId : undefined}
            className="h-full min-w-0 flex-1 border-0 bg-transparent px-3 text-sm text-navy placeholder:text-navy/35 focus:outline-none focus:ring-0"
          />
          <span
            aria-hidden="true"
            className="grid shrink-0 place-items-center border-l border-navy/[0.08] bg-mist/50 px-3 text-sm font-semibold text-navy/45"
          >
            .{SUBDOMAIN_DOMAIN}
          </span>
        </div>

        <Button
          type="button"
          variant="outline"
          size="md"
          withArrow={false}
          onClick={() => onCheck()}
          disabled={Boolean(formatError) || checking || reserved}
          className={cn(
            "shrink-0 rounded-xl sm:w-44",
            available &&
              "border-success-500/50 bg-success-50 text-success-700 hover:border-success-600 hover:bg-success-50",
            reserved && "border-danger-400 bg-danger-50 text-danger-600",
          )}
        >
          {checking ? (
            <>
              <Spinner size="sm" label="Checking subdomain availability" /> Checking…
            </>
          ) : available ? (
            <>
              <Check size={16} strokeWidth={2.5} aria-hidden="true" /> Available
            </>
          ) : reserved ? (
            "Reserved"
          ) : (
            "Check Availability"
          )}
        </Button>
      </div>

      <div aria-live="polite" id={messageId}>
        {message ? (
          <p
            role={tone === "error" ? "alert" : undefined}
            className={cn(
              "text-xs font-bold",
              tone === "error" && "text-danger-600",
              tone === "success" && "text-success-600",
              tone === "info" && "text-brand-700",
            )}
          >
            {message}
          </p>
        ) : (
          <p className="text-xs text-navy/45">{HINT}</p>
        )}
      </div>
    </div>
  );
}
