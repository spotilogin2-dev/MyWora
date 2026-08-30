import { Card } from "@/components/ui/Card";

const NEXT_STEPS = [
  { title: "Complete your account setup", description: "Create your owner account" },
  { title: "Verify your email", description: "Confirm your email address" },
  { title: "Start your 14-day free trial", description: "Explore all MyWora features" },
];

/** Right-rail card: what happens after registration. */
export default function WhatsNextCard() {
  return (
    <Card className="p-6">
      <h2 className="text-base font-extrabold text-navy">What's Next?</h2>
      <ol className="mt-5">
        {NEXT_STEPS.map((item, index) => {
          const isLast = index === NEXT_STEPS.length - 1;
          return (
            <li key={item.title} className="flex gap-3.5">
              <div className="flex flex-col items-center">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-brand text-xs font-bold text-white">
                  {index + 1}
                </span>
                {!isLast && <span aria-hidden="true" className="my-1 w-px flex-1 bg-navy/10" />}
              </div>
              <div className={isLast ? "" : "pb-5"}>
                <p className="text-sm font-bold text-navy">{item.title}</p>
                <p className="mt-0.5 text-[13px] text-navy/50">{item.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </Card>
  );
}
