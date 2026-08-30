import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { MouseEvent, ReactNode } from "react";
import { cn } from "@/lib/cn";
import Spinner from "./Spinner";

type Variant = "primary" | "outline" | "white" | "ghostLight";
type Size = "sm" | "md" | "lg";

export interface ButtonProps {
  variant?: Variant;
  size?: Size;
  /** Internal route destination — rendered as a react-router Link. */
  to?: string;
  /** In-page anchor or external URL — rendered as a plain anchor. */
  href?: string;
  type?: "button" | "submit";
  title?: string;
  onClick?: (event: MouseEvent<HTMLElement>) => void;
  className?: string;
  children: ReactNode;
  withArrow?: boolean;
  /** Shows a spinner and disables the button. */
  loading?: boolean;
  disabled?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "btn-primary",
  outline: "btn-outline",
  white: "btn-white",
  ghostLight: "btn-ghost-light",
};

const sizeClasses: Record<Size, string> = {
  sm: "h-9 px-4 text-[13px]",
  md: "h-11 px-6 text-sm",
  lg: "h-12 px-7 text-[15px]",
};

export default function Button({
  variant = "primary",
  size = "md",
  to,
  href,
  type = "button",
  title,
  onClick,
  className,
  children,
  withArrow = true,
  loading = false,
  disabled = false,
}: ButtonProps) {
  const classes = cn(
    "btn group focus-ring",
    variantClasses[variant],
    sizeClasses[size],
    loading && "cursor-progress",
    className,
  );

  const content = (
    <>
      {children}
      {loading ? (
        <Spinner size="sm" />
      ) : (
        withArrow && (
          <ArrowRight
            size={16}
            strokeWidth={2.2}
            aria-hidden="true"
            className="transition-transform duration-200 group-hover:translate-x-0.5"
          />
        )
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick} title={title}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} title={title}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      title={title}
    >
      {content}
    </button>
  );
}
