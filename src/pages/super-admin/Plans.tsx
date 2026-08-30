import { Check, Pencil } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import PageHeader from "@/components/ui/PageHeader";
import { PLATFORM_PLANS } from "@/config/platform-plans";

export default function Plans() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Plans"
        description="Frontend definitions of the MyWora plan structure, mirroring the public pricing page. Database-backed plans and the subscription architecture arrive in Phase 21."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {PLATFORM_PLANS.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardContent className="flex flex-1 flex-col p-5">
              <div className="flex items-center justify-between gap-2">
                <h2 className="text-base font-extrabold text-navy">{plan.name}</h2>
                {plan.popular && <Badge tone="brand">Most Popular</Badge>}
              </div>
              <p className="mt-1 text-[13px] leading-relaxed text-navy/50">{plan.blurb}</p>

              <div className="mt-4 flex items-baseline gap-1.5 border-t border-navy/5 pt-4">
                <span className="text-3xl font-extrabold tracking-tight text-navy">{plan.priceLabel}</span>
                <span className="text-xs font-semibold text-navy/45">{plan.priceSuffix}</span>
              </div>

              <ul className="mt-4 flex flex-1 flex-col gap-2.5">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5 text-[13px] text-navy/70">
                    <span className="mt-0.5 grid h-[18px] w-[18px] shrink-0 place-items-center rounded-full bg-brand text-white">
                      <Check size={10} strokeWidth={3.5} aria-hidden="true" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <div className="mt-5 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  withArrow={false}
                  disabled
                  title="Plan editing arrives with the subscription architecture (Phase 21)"
                  className="w-full"
                >
                  <Pencil size={13} aria-hidden="true" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
