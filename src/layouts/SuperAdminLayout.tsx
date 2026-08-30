import { useEffect, useState } from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import {
  ArrowRight,
  BarChart3,
  Bell,
  Building2,
  ChevronDown,
  Crown,
  Globe,
  HelpCircle,
  History,
  Info,
  Layers,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  X,
} from "lucide-react";
import Logo from "@/components/Logo";
import { cn } from "@/lib/cn";

const navItems = [
  { to: "/super-admin", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/super-admin/businesses", label: "Businesses", icon: Building2 },
  { to: "/super-admin/plans", label: "Plans", icon: Layers },
  { to: "/super-admin/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/super-admin/activity", label: "Activity", icon: History },
  { to: "/super-admin/settings", label: "Settings", icon: Settings },
  { to: "/super-admin/support", label: "Support", icon: LifeBuoy },
];

/** Dismissible notice explaining what is — and is not — wired up yet. */
function PreviewBanner() {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;
  return (
    <div className="mb-6 flex items-center gap-2.5 rounded-xl border border-brand/15 bg-brand-50 px-4 py-2.5">
      <Info size={15} aria-hidden="true" className="shrink-0 text-brand" />
      <p className="flex-1 text-xs leading-relaxed text-navy/65">
        <span className="font-extrabold text-navy">Frontend preview.</span> Authentication arrives in Phase 5
        and the database layer in Phase 6 — screens show true empty states, not demo data.
      </p>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        aria-label="Dismiss notice"
        className="grid h-6 w-6 shrink-0 place-items-center rounded-full text-navy/40 transition-colors hover:bg-navy/5 hover:text-navy"
      >
        <X size={13} aria-hidden="true" />
      </button>
    </div>
  );
}

function NotificationsPopover() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {open && <div aria-hidden="true" className="fixed inset-0 z-20" onClick={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Notifications"
        aria-expanded={open}
        className="focus-ring grid h-10 w-10 place-items-center rounded-full text-navy/55 transition-colors hover:bg-navy/[0.05] hover:text-navy"
      >
        <Bell size={18} aria-hidden="true" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-64 rounded-xl border border-navy/10 bg-white p-4 shadow-float">
          <p className="text-sm font-bold text-navy">Notifications</p>
          <p className="mt-1 text-xs leading-relaxed text-navy/50">
            No notifications yet. Platform alerts arrive with Phase 22 (Notifications + Audit Logs).
          </p>
        </div>
      )}
    </div>
  );
}

function UserMenu() {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      {open && <div aria-hidden="true" className="fixed inset-0 z-20" onClick={() => setOpen(false)} />}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label="Account menu"
        aria-expanded={open}
        className="focus-ring flex items-center gap-2.5 rounded-full py-1 pl-1 pr-2 transition-colors hover:bg-navy/[0.04]"
      >
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <span className="text-[13px] font-bold text-navy">MyWora Platform</span>
          <span className="text-[11px] text-navy/45">Owner</span>
        </span>
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand text-xs font-extrabold text-white">
          SA
        </span>
        <ChevronDown size={15} aria-hidden="true" className="text-navy/40" />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl border border-navy/10 bg-white p-1.5 shadow-float">
          <Link
            to="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-navy/70 transition-colors hover:bg-navy/[0.04] hover:text-navy"
          >
            <Globe size={15} aria-hidden="true" className="text-navy/40" />
            View site
          </Link>
          <Link
            to="/super-admin/admins"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-semibold text-navy/70 transition-colors hover:bg-navy/[0.04] hover:text-navy"
          >
            <ShieldCheck size={15} aria-hidden="true" className="text-navy/40" />
            Platform Admins
          </Link>
          <div className="my-1.5 border-t border-navy/[0.06]" aria-hidden="true" />
          <button
            type="button"
            disabled
            title="Authentication arrives in Phase 5"
            className="flex w-full cursor-not-allowed items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[13px] font-semibold text-navy/35"
          >
            <LogOut size={15} aria-hidden="true" />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}

export default function SuperAdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const nav = (
    <nav aria-label="Super Admin" className="flex-1 overflow-y-auto px-3 py-5">
      <ul className="flex flex-col gap-1">
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={closeMenu}
              className={({ isActive }) =>
                cn(
                  "focus-ring flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-bold transition-colors",
                  isActive
                    ? "bg-brand text-white shadow-md shadow-brand/25"
                    : "text-navy/55 hover:bg-navy/[0.04] hover:text-navy",
                )
              }
            >
              <item.icon size={18} aria-hidden="true" className="shrink-0 opacity-80" />
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <div className="min-h-screen bg-page">
      <a href="#super-admin-content" className="skip-link">
        Skip to content
      </a>

      {/* Mobile overlay */}
      {menuOpen && (
        <div aria-hidden="true" onClick={closeMenu} className="fixed inset-0 z-40 bg-navy/40 lg:hidden" />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-[250px] flex-col border-r border-navy/[0.06] bg-white transition-transform duration-300 lg:translate-x-0",
          menuOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-navy/[0.06] px-5">
          <Logo subtitle="Super Admin" />
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close menu"
            className="grid h-9 w-9 place-items-center rounded-xl text-navy/50 transition-colors hover:bg-navy/5 hover:text-navy lg:hidden"
          >
            <X size={19} aria-hidden="true" />
          </button>
        </div>

        {nav}

        {/* Upgrade card */}
        <div className="shrink-0 px-3 pb-3">
          <div className="rounded-xl bg-brand p-4 text-white">
            <Crown size={20} aria-hidden="true" className="text-white/90" />
            <p className="mt-2.5 text-sm font-extrabold">Upgrade Your Platform</p>
            <p className="mt-1 text-xs leading-relaxed text-white/75">
              Unlock advanced features and grow your platform effortlessly.
            </p>
            <Link
              to="/super-admin/plans"
              className="mt-3.5 inline-flex h-9 items-center gap-1.5 rounded-lg bg-white px-3.5 text-[13px] font-extrabold text-brand transition-colors hover:bg-brand-50"
            >
              View Plans
              <ArrowRight size={14} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Current (placeholder) admin identity — replaced by real session data in Phase 5. */}
        <div className="flex shrink-0 items-center gap-3 border-t border-navy/[0.06] p-4">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-navy/[0.06] text-xs font-extrabold text-navy/70">
            SA
          </span>
          <div className="min-w-0 flex-1 leading-tight">
            <p className="truncate text-[13px] font-bold text-navy">Super Admin</p>
            <p className="truncate text-[11px] text-navy/45">admin@mywora.io</p>
          </div>
          <ChevronDown size={15} aria-hidden="true" className="shrink-0 text-navy/35" />
        </div>
      </aside>

      {/* Content column */}
      <div className="lg:pl-[250px]">
        <header className="sticky top-0 z-30 border-b border-navy/[0.06] bg-white">
          <div className="flex h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open menu"
              className="focus-ring grid h-10 w-10 place-items-center rounded-xl text-navy transition-colors hover:bg-navy/5 lg:hidden"
            >
              <Menu size={20} aria-hidden="true" />
            </button>

            {/* Global search — searches real platform data from Phase 6 onward. */}
            <form
              role="search"
              className="hidden w-full max-w-md md:block"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="relative">
                <Search
                  size={15}
                  aria-hidden="true"
                  className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-navy/35"
                />
                <input
                  type="search"
                  aria-label="Search businesses, owners, or anything"
                  placeholder="Search businesses, owners, or anything..."
                  className="h-10 w-full rounded-full bg-navy/[0.045] pl-10 pr-4 text-sm text-navy transition-colors placeholder:text-navy/35 focus:bg-navy/[0.06] focus:outline-none focus:ring-2 focus:ring-brand/25"
                />
              </div>
            </form>

            <div className="ml-auto flex items-center gap-1.5 sm:gap-2.5">
              <NotificationsPopover />
              <Link
                to="/super-admin/support"
                aria-label="Help and support"
                className="focus-ring grid h-10 w-10 place-items-center rounded-full text-navy/55 transition-colors hover:bg-navy/[0.05] hover:text-navy"
              >
                <HelpCircle size={18} aria-hidden="true" />
              </Link>
              <div className="ml-1 border-l border-navy/[0.08] pl-2.5 sm:ml-2 sm:pl-3.5">
                <UserMenu />
              </div>
            </div>
          </div>
        </header>

        <main id="super-admin-content" className="p-4 sm:p-6 lg:p-8">
          <div className="mx-auto w-full max-w-[1400px]">
            <PreviewBanner />
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
