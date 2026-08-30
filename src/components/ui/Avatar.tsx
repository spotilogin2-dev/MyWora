import { cn } from "@/lib/cn";

type AvatarSize = "sm" | "md" | "lg";
type AvatarTone = "brand" | "accent" | "navy" | "success";

const sizeClasses: Record<AvatarSize, string> = {
  sm: "h-8 w-8 text-[10px]",
  md: "h-10 w-10 text-xs",
  lg: "h-12 w-12 text-sm",
};

const toneClasses: Record<AvatarTone, string> = {
  brand: "bg-brand-50 text-brand-600",
  accent: "bg-accent-50 text-accent-600",
  navy: "bg-navy/10 text-navy",
  success: "bg-success-50 text-success-600",
};

export interface AvatarProps {
  name: string;
  size?: AvatarSize;
  tone?: AvatarTone;
  className?: string;
}

function initialsOf(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word[0] ?? "")
    .join("")
    .toUpperCase();
}

/** Initials avatar — no images required. */
export default function Avatar({ name, size = "md", tone = "brand", className }: AvatarProps) {
  return (
    <span
      title={name}
      className={cn(
        "grid shrink-0 select-none place-items-center rounded-full font-extrabold",
        sizeClasses[size],
        toneClasses[tone],
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  );
}
