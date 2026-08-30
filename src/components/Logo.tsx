import { useId } from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  /** Render only the brand mark, without the wordmark. */
  compact?: boolean;
  /** `light` renders the wordmark white — for dark surfaces. */
  tone?: "dark" | "light";
  /** Small tag rendered under the wordmark (e.g. "Super Admin"). */
  subtitle?: string;
}

export default function Logo({ className = "", compact = false, tone = "dark", subtitle }: LogoProps) {
  const gradientId = useId();

  return (
    <Link to="/" aria-label="MyWora — home" className={`inline-flex items-center gap-2 ${className}`}>
      <svg width="30" height="30" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id={gradientId} x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
            <stop stopColor="#FF8A50" />
            <stop offset="1" stopColor="#FF6A32" />
          </linearGradient>
        </defs>
        <path
          d="M5.5 9.5 11 23l5-9.5L21 23l5.5-13.5"
          stroke={`url(#${gradientId})`}
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      {!compact && (
        <span className="flex flex-col leading-none">
          <span
            className={`text-lg font-extrabold tracking-tight ${tone === "light" ? "text-white" : "text-navy"}`}
          >
            MyWora
          </span>
          {subtitle && (
            <span className="mt-1 text-[11px] font-bold tracking-wide text-accent">{subtitle}</span>
          )}
        </span>
      )}
    </Link>
  );
}
