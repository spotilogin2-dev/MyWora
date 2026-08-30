import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Logo from "../Logo";

interface FooterItem {
  label: string;
  href?: string;
  soon?: boolean;
}

const columns: { title: string; items: FooterItem[] }[] = [
  {
    title: "Product",
    items: [
      { label: "Features", href: "#features" },
      { label: "Pricing", href: "#pricing" },
      { label: "Customer Portal", soon: true },
      { label: "Vehicle Portal", soon: true },
      { label: "Updates", soon: true },
    ],
  },
  {
    title: "Resources",
    items: [
      { label: "How It Works", href: "#how-it-works" },
      { label: "Guides", soon: true },
      { label: "Help", soon: true },
      { label: "Contact", href: "#contact" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "About", soon: true },
      { label: "Privacy", soon: true },
      { label: "Terms", soon: true },
    ],
  },
];

const socials: { icon: LucideIcon; label: string }[] = [
  { icon: Facebook, label: "Facebook" },
  { icon: Instagram, label: "Instagram" },
  { icon: Linkedin, label: "LinkedIn" },
  { icon: Youtube, label: "YouTube" },
];

function FooterLink({ item }: { item: FooterItem }) {
  if (item.soon || !item.href) {
    return (
      <span title="Coming soon" className="cursor-default text-sm text-navy/35">
        {item.label}
      </span>
    );
  }
  return (
    <a href={item.href} className="text-sm text-navy/55 transition-colors hover:text-brand">
      {item.label}
    </a>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-navy/5 bg-white pb-8 pt-16">
      <div className="container-x">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-navy/55">
              All-in-one workshop management platform built to simplify operations, improve customer
              experience and help businesses grow.
            </p>
            <div className="mt-6 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="#"
                  title="Coming soon"
                  aria-label={`${social.label} (coming soon)`}
                  onClick={(event) => event.preventDefault()}
                  className="grid h-9 w-9 place-items-center rounded-full border border-navy/10 text-navy/55 transition-all hover:border-brand hover:bg-brand hover:text-white"
                >
                  <social.icon size={15} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {columns.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="text-sm font-extrabold text-navy">{column.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <FooterLink item={item} />
                  </li>
                ))}
              </ul>
            </nav>
          ))}

          {/* Contact — placeholder details, nothing invented */}
          <div id="contact">
            <p className="text-sm font-extrabold text-navy">Contact</p>
            <ul className="mt-4 flex flex-col gap-3 text-sm text-navy/55">
              <li className="flex items-center gap-2.5">
                <Phone size={14} className="shrink-0 text-brand" aria-hidden="true" />
                <span className="text-navy/40">+00 000 0000000</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={14} className="shrink-0 text-brand" aria-hidden="true" />
                <span className="text-navy/40">hello@mywora.com</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin size={14} className="shrink-0 text-brand" aria-hidden="true" />
                <span className="text-navy/40">Your City, Country</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-navy/5 pt-6 text-xs text-navy/40 sm:flex-row">
          <p>© 2026 MyWora. All rights reserved.</p>
          <p>mywora.com</p>
        </div>
      </div>
    </footer>
  );
}
