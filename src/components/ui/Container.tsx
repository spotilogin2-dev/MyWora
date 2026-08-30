import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

/**
 * Page-width wrapper. Base: max-w-7xl + responsive horizontal padding
 * (.container-x). `container-narrow` / `container-wide` variants are defined
 * in index.css and override the max-width when applied together.
 */
export default function Container({ className, ...rest }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn("container-x", className)} {...rest} />;
}
