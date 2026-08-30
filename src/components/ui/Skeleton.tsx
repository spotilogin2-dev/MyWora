import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

/** Loading placeholder block. Pair with content of similar size. */
export default function Skeleton({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div aria-hidden="true" className={cn("animate-pulse rounded-xl bg-navy/[0.07]", className)} {...rest} />
  );
}
