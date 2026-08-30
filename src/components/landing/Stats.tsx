import { Clock, FileText, LayoutGrid, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "../Reveal";

interface Stat {
  icon: LucideIcon;
  value: string;
  label: string;
}

/**
 * Product capability metrics — intentionally neutral.
 * These do NOT claim real platform usage, customers or statistics.
 */
const stats: Stat[] = [
  { icon: Users, value: "All-in-One", label: "Workshop Management" },
  { icon: Clock, value: "24/7", label: "Customer Access" },
  { icon: LayoutGrid, value: "1 Workspace", label: "For Your Operations" },
  { icon: FileText, value: "1 Record", label: "Per Vehicle" },
];

export default function Stats() {
  return (
    <section className="relative overflow-hidden border-y border-navy/5 bg-white">
      {/* Orange gradient block — decorative, matches the reference composition */}
      <div
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-14 bg-gradient-to-b from-accent-400 to-accent-600 sm:w-24"
      />

      <div className="container-x relative py-14 lg:py-16 lg:pl-32">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <Reveal
              key={stat.value}
              delay={index * 90}
              className={`lg:px-6 ${index > 0 ? "lg:border-l lg:border-navy/[0.08]" : ""}`}
            >
              <div className="flex flex-col items-center gap-3 text-center">
                <stat.icon size={24} strokeWidth={1.8} className="text-brand" aria-hidden="true" />
                <p className="text-3xl font-medium tracking-tight text-navy lg:text-[2.1rem]">{stat.value}</p>
                <p className="text-sm text-navy/50">{stat.label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
