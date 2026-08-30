import {
  ArrowRight,
  Bell,
  Car,
  ChartColumn,
  FileText,
  Gauge,
  Globe,
  Upload,
  User,
  Users,
  Wallet,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Reveal from "../Reveal";
import SectionHeading from "@/components/ui/SectionHeading";

interface Feature {
  icon: LucideIcon;
  tint: "blue" | "orange";
  title: string;
  desc: string;
}

const features: Feature[] = [
  {
    icon: Users,
    tint: "blue",
    title: "Customer Management",
    desc: "Store customer details, contact history and service records.",
  },
  {
    icon: Car,
    tint: "orange",
    title: "Vehicle Management",
    desc: "Manage vehicles, registrations, KM readings and service history.",
  },
  {
    icon: FileText,
    tint: "blue",
    title: "Service & Income Tracking",
    desc: "Create service entries and track workshop income.",
  },
  {
    icon: Wallet,
    tint: "orange",
    title: "Expense Management",
    desc: "Track expenses and manage workshop costs.",
  },
  {
    icon: Bell,
    tint: "blue",
    title: "Follow-Up System",
    desc: "Never miss a service follow-up.",
  },
  {
    icon: User,
    tint: "orange",
    title: "Customer Portal",
    desc: "Give customers access to their vehicle and service history.",
  },
  {
    icon: Gauge,
    tint: "blue",
    title: "Vehicle Portal",
    desc: "Provide vehicle-specific service history access.",
  },
  {
    icon: Upload,
    tint: "orange",
    title: "Bill Uploading",
    desc: "Upload and securely manage service bills.",
  },
  {
    icon: ChartColumn,
    tint: "blue",
    title: "Reports & Analytics",
    desc: "Understand workshop performance.",
  },
  {
    icon: Globe,
    tint: "orange",
    title: "Business Website",
    desc: "Give every workshop its own professional web presence.",
  },
];

export default function Features() {
  return (
    <section id="features" className="bg-white py-20 lg:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Features"
          title={
            <>
              Everything Your
              <br />
              Workshop Needs
              <br />
              to Grow
            </>
          }
          aside={
            <>
              <p>Powerful tools to help you manage operations, delight customers and grow your business.</p>
              <a
                href="#features-grid"
                className="group mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-brand transition-colors hover:text-brand-600"
              >
                Explore All Features
                <ArrowRight
                  size={15}
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
            </>
          }
        />

        <div id="features-grid" className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {features.map((feature, index) => (
            <Reveal key={feature.title} delay={(index % 5) * 70} className="h-full">
              <div className="group h-full rounded-2xl border border-navy/[0.07] bg-white p-5 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-float">
                <span
                  className={`icon-tile transition-transform duration-300 group-hover:scale-105 ${
                    feature.tint === "blue" ? "bg-brand-50 text-brand" : "bg-accent-50 text-accent-600"
                  }`}
                >
                  <feature.icon size={20} strokeWidth={2} aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[15px] font-bold leading-snug text-navy">{feature.title}</h3>
                <p className="mt-1.5 text-[13px] leading-relaxed text-navy/55">{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
