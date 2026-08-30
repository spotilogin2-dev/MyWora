import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import SuperAdminLayout from "@/layouts/SuperAdminLayout";
import Overview from "./Overview";
import Businesses from "./Businesses";
import Plans from "./Plans";
import Analytics from "./Analytics";
import Activity from "./Activity";
import Settings from "./Settings";
import Support from "./Support";

function renderSuperAdmin(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/super-admin" element={<SuperAdminLayout />}>
          <Route index element={<Overview />} />
          <Route path="businesses" element={<Businesses />} />
          <Route path="plans" element={<Plans />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="activity" element={<Activity />} />
          <Route path="settings" element={<Settings />} />
          <Route path="support" element={<Support />} />
        </Route>
      </Routes>
    </MemoryRouter>,
  );
}

describe("Super Admin shell", () => {
  it("renders the reference-style navigation with all sections", () => {
    renderSuperAdmin("/super-admin");

    expect(screen.getByRole("navigation", { name: /super admin/i })).toBeInTheDocument();
    const navLinks: [string, string][] = [
      ["Overview", "/super-admin"],
      ["Businesses", "/super-admin/businesses"],
      ["Plans", "/super-admin/plans"],
      ["Analytics", "/super-admin/analytics"],
      ["Activity", "/super-admin/activity"],
      ["Settings", "/super-admin/settings"],
      ["Support", "/super-admin/support"],
    ];
    for (const [name, href] of navLinks) {
      expect(screen.getByRole("link", { name })).toHaveAttribute("href", href);
    }
  });

  it("points the upgrade card and account menu at real destinations", () => {
    renderSuperAdmin("/super-admin");

    expect(screen.getByRole("link", { name: /view plans/i })).toHaveAttribute("href", "/super-admin/plans");

    // Open the account menu, then verify Sign out is honestly disabled.
    fireEvent.click(screen.getByRole("button", { name: /account menu/i }));
    expect(screen.getByRole("button", { name: "Sign out" })).toBeDisabled();
  });

  it("tells the truth about what is not wired up yet", () => {
    renderSuperAdmin("/super-admin");
    expect(screen.getByText(/frontend preview/i)).toBeInTheDocument();
  });
});

describe("Super Admin overview", () => {
  it("renders the six platform metrics with true zeros", () => {
    renderSuperAdmin("/super-admin");

    for (const label of [
      "Total Businesses",
      "Active Businesses",
      "Trial Businesses",
      "Suspended Businesses",
      "Total Customers",
      "Total Vehicles",
    ]) {
      expect(screen.getByText(label)).toBeInTheDocument();
    }
    // 6 tiles + 4 mini metrics + 1 chart axis label — all genuine zeros.
    expect(screen.getAllByText("0").length).toBeGreaterThanOrEqual(10);
  });

  it("shows the empty chart, registrations and businesses table", () => {
    renderSuperAdmin("/super-admin");

    expect(screen.getByText("Welcome back, Admin!")).toBeInTheDocument();
    expect(screen.getByText("Platform Overview")).toBeInTheDocument();
    expect(screen.getByText("Recent Registrations")).toBeInTheDocument();
    expect(screen.getByText("No data available yet")).toBeInTheDocument();
    expect(screen.getByText("No businesses registered yet")).toBeInTheDocument();
    expect(screen.getByText("Businesses Overview")).toBeInTheDocument();
    expect(screen.getByText("No businesses yet")).toBeInTheDocument();
    expect(screen.getByText("Showing 0 to 0 of 0 results")).toBeInTheDocument();
    expect(screen.queryByText("FA Auto")).not.toBeInTheDocument();
  });

  it("keeps Add Business disabled until the database arrives", () => {
    renderSuperAdmin("/super-admin");
    expect(screen.getByRole("button", { name: /add business/i })).toBeDisabled();
  });
});

describe("Super Admin businesses page", () => {
  it("shows the empty state with no demo data", () => {
    renderSuperAdmin("/super-admin/businesses");

    expect(screen.getByText("All Businesses")).toBeInTheDocument();
    expect(screen.getByText("No businesses yet")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add business/i })).toBeDisabled();
    expect(screen.queryByText("FA Auto")).not.toBeInTheDocument();
  });
});

describe("Super Admin plans page", () => {
  it("lists the four platform plans, read-only", () => {
    renderSuperAdmin("/super-admin/plans");

    for (const name of ["Starter", "Growth", "Pro", "Enterprise"]) {
      expect(screen.getByText(name)).toBeInTheDocument();
    }
    expect(screen.getAllByRole("button", { name: /edit/i })).toHaveLength(4);
    expect(screen.getAllByRole("button", { name: /edit/i })[0]).toBeDisabled();
  });
});

describe("Secondary console pages stay honest about their phase", () => {
  it("analytics waits for Phase 19", () => {
    renderSuperAdmin("/super-admin/analytics");
    expect(screen.getByText("No analytics yet")).toBeInTheDocument();
  });

  it("activity waits for Phase 22", () => {
    renderSuperAdmin("/super-admin/activity");
    expect(screen.getByText("No activity yet")).toBeInTheDocument();
  });

  it("settings links to the implemented Platform Admins section", () => {
    renderSuperAdmin("/super-admin/settings");
    expect(screen.getByRole("link", { name: "Manage" })).toHaveAttribute("href", "/super-admin/admins");
  });

  it("support publishes no invented contact details", () => {
    renderSuperAdmin("/super-admin/support");
    expect(screen.getByText("No support channels yet")).toBeInTheDocument();
  });
});
