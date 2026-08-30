import { Info } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { SUBDOMAIN_DOMAIN, normalizeSubdomain } from "@/lib/registration";

interface WorkspacePreviewCardProps {
  subdomain: string;
}

/** Right-rail card: live workspace URL preview + illustrative mini mockup. */
export default function WorkspacePreviewCard({ subdomain }: WorkspacePreviewCardProps) {
  const preview = normalizeSubdomain(subdomain) || "your-subdomain";

  return (
    <Card className="p-6">
      <h2 className="text-base font-extrabold text-navy">Your Workspace Preview</h2>
      <p className="mt-1.5 text-[13px] text-navy/55">Your workspace will be available at:</p>

      <p
        aria-live="polite"
        className="mt-3 break-all rounded-xl border border-navy/[0.08] bg-mist/40 px-4 py-3 text-sm"
      >
        <span className="text-navy/45">https://</span>
        <span className="font-bold text-brand">{preview}</span>
        <span className="text-navy/45">.{SUBDOMAIN_DOMAIN}</span>
      </p>

      {/* Mini product mockup — purely illustrative, contains no real data. */}
      <div className="mt-4 overflow-hidden rounded-xl border border-navy/[0.08]" aria-hidden="true">
        <div className="flex items-center gap-1.5 border-b border-navy/[0.06] bg-mist/40 px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-navy/15" />
          <span className="h-2 w-2 rounded-full bg-navy/15" />
          <span className="h-2 w-2 rounded-full bg-navy/15" />
          <span className="ml-2 flex items-center gap-1 text-[10px] font-extrabold text-navy">
            <svg width="10" height="10" viewBox="0 0 32 32" fill="none">
              <path
                d="M5.5 9.5 11 23l5-9.5L21 23l5.5-13.5"
                stroke="#FF6A32"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            MyWora
          </span>
        </div>
        <div className="flex bg-white">
          <div className="w-12 shrink-0 space-y-2 border-r border-navy/[0.06] p-2.5">
            <span className="block h-2 w-8 rounded-full bg-brand" />
            <span className="block h-2 w-6 rounded-full bg-navy/10" />
            <span className="block h-2 w-7 rounded-full bg-navy/10" />
            <span className="block h-2 w-6 rounded-full bg-navy/10" />
            <span className="block h-2 w-7 rounded-full bg-navy/10" />
          </div>
          <div className="min-w-0 flex-1 p-3">
            <div className="flex gap-2">
              <span className="h-10 flex-1 rounded-lg bg-mist/70" />
              <span className="h-10 flex-1 rounded-lg bg-mist/70" />
              <span className="h-10 flex-1 rounded-lg bg-mist/70" />
            </div>
            <div className="mt-2.5 flex items-center gap-2">
              <svg viewBox="0 0 120 44" className="h-11 min-w-0 flex-1 rounded-lg bg-mist/40 p-1">
                <polyline
                  points="4,34 22,28 40,31 58,20 76,24 94,12 116,16"
                  fill="none"
                  stroke="#1455E8"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="grid h-11 w-11 shrink-0 place-items-center rounded-full"
                style={{ background: "conic-gradient(#1455E8 0% 62%, #FF6A32 62% 84%, #E9EEF0 84% 100%)" }}
              >
                <span className="h-6 w-6 rounded-full bg-white" />
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-start gap-2.5 rounded-xl bg-brand-50 p-3.5">
        <Info size={15} aria-hidden="true" className="mt-0.5 shrink-0 text-brand" />
        <p className="text-[13px] font-semibold leading-relaxed text-brand-700">
          You can change this information later from your workspace settings.
        </p>
      </div>
    </Card>
  );
}
