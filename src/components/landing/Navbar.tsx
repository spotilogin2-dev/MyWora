import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import Logo from "../Logo";
import Button from "../ui/Button";
import { useScrolled } from "../../hooks/useScrolled";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
];

const resourceItems: { label: string; soon?: boolean; href?: string }[] = [
  { label: "Guides", soon: true },
  { label: "Help Center", soon: true },
  { label: "Contact Us", href: "#contact" },
];

function SoonRow({ label }: { label: string }) {
  return (
    <span
      title="Coming soon"
      className="flex cursor-default items-center justify-between rounded-xl px-3 py-2.5 text-sm font-semibold text-navy/35"
    >
      {label}
      <span className="rounded-full bg-mist px-2 py-0.5 text-[10px] font-bold text-navy/45">SOON</span>
    </span>
  );
}

export default function Navbar() {
  const scrolled = useScrolled(10);
  const [menuOpen, setMenuOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef<HTMLDivElement>(null);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // Close the resources dropdown on outside click / Escape.
  useEffect(() => {
    if (!resourcesOpen) return;
    const onPointerDown = (event: MouseEvent) => {
      if (resourcesRef.current && !resourcesRef.current.contains(event.target as Node)) {
        setResourcesOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setResourcesOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [resourcesOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/90 shadow-[0_10px_30px_-18px_rgba(13,21,63,0.25)] backdrop-blur-xl"
          : "bg-white/60 backdrop-blur-md"
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between lg:h-[76px]">
        <Logo />

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}

          <div ref={resourcesRef} className="relative">
            <button
              type="button"
              onClick={() => setResourcesOpen((open) => !open)}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              className="nav-link inline-flex items-center gap-1"
            >
              Resources
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>

            {resourcesOpen && (
              <div className="absolute left-1/2 top-full z-50 mt-3 w-56 -translate-x-1/2 rounded-2xl border border-navy/[0.08] bg-white p-2 shadow-float">
                {resourceItems.map((item) =>
                  item.soon ? (
                    <SoonRow key={item.label} label={item.label} />
                  ) : (
                    <a
                      key={item.label}
                      href={item.href}
                      onClick={() => setResourcesOpen(false)}
                      className="flex items-center justify-between rounded-xl px-3 py-2 text-sm font-semibold text-navy/70 transition-colors hover:bg-mist/70 hover:text-navy"
                    >
                      {item.label}
                    </a>
                  ),
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden items-center gap-6 lg:flex">
          <Link to="/login" className="text-sm font-bold text-navy/70 transition-colors hover:text-navy">
            Login
          </Link>
          <Button to="/register" size="md">
            Start Free
          </Button>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid h-10 w-10 place-items-center rounded-xl text-navy transition-colors hover:bg-navy/5 lg:hidden"
        >
          {menuOpen ? <X size={22} aria-hidden="true" /> : <Menu size={22} aria-hidden="true" />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="border-t border-navy/5 bg-white lg:hidden">
          <nav className="container-x flex flex-col gap-1 py-4" aria-label="Mobile">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={closeMenu}
                className="rounded-xl px-3 py-3 text-[15px] font-bold text-navy/75 transition-colors hover:bg-mist/70 hover:text-navy"
              >
                {link.label}
              </a>
            ))}

            <p className="px-3 pb-1 pt-4 text-[11px] font-bold uppercase tracking-[0.18em] text-navy/35">
              Resources
            </p>
            {resourceItems.map((item) =>
              item.soon ? (
                <SoonRow key={item.label} label={item.label} />
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMenu}
                  className="rounded-xl px-3 py-2.5 text-sm font-semibold text-navy/70 transition-colors hover:bg-mist/70"
                >
                  {item.label}
                </a>
              ),
            )}

            <div className="mt-4 flex flex-col gap-3 border-t border-navy/5 pt-4">
              <Button to="/login" variant="outline" withArrow={false} className="w-full">
                Login
              </Button>
              <Button to="/register" withArrow={false} className="w-full">
                Start Free
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
