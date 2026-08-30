import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import RegistrationPage from "./RegistrationPage";

function renderRegister() {
  return render(
    <MemoryRouter initialEntries={["/register"]}>
      <Routes>
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<div>Login route</div>} />
        <Route path="/" element={<div>Landing route</div>} />
      </Routes>
    </MemoryRouter>,
  );
}

function fillStepOne() {
  fireEvent.change(screen.getByLabelText(/business name/i), { target: { value: "Falcon Motors" } });
  fireEvent.change(screen.getByLabelText(/business type/i), {
    target: { value: "Auto Repair & Service" },
  });
  fireEvent.change(screen.getByLabelText(/phone number/i), { target: { value: "0300 1234567" } });
  fireEvent.change(screen.getByLabelText(/city/i), { target: { value: "Lahore" } });
  fireEvent.change(screen.getByLabelText(/choose your subdomain/i), {
    target: { value: "Falcon-Motors" },
  });
}

describe("Registration page shell", () => {
  it("renders the three-step wizard with brand panel, stepper and preview rail", () => {
    renderRegister();

    expect(screen.getByText(/let's set up your workshop/i)).toBeInTheDocument();
    expect(screen.getByText(/workshop workspace/i)).toBeInTheDocument();
    expect(screen.getAllByText("Business Information").length).toBeGreaterThanOrEqual(2);
    expect(screen.getByText("Your Workspace Preview")).toBeInTheDocument();
    expect(screen.getByText(/what's next\?/i)).toBeInTheDocument();
    expect(screen.getByText("your-subdomain")).toBeInTheDocument();
    expect(screen.getByText(/14-day free trial/i)).toBeInTheDocument();
  });

  it("links existing users to login", () => {
    renderRegister();
    expect(screen.getByRole("link", { name: /login here/i })).toHaveAttribute("href", "/login");
  });
});

describe("Subdomain field", () => {
  it("normalizes input and updates the live preview", async () => {
    renderRegister();
    const input = screen.getByLabelText(/choose your subdomain/i);
    fireEvent.change(input, { target: { value: "Falcon-Motors" } });

    expect(input).toHaveValue("falcon-motors");
    await screen.findByText("falcon-motors", undefined, { timeout: 3000 });
  });

  it("flags reserved subdomains as unavailable", async () => {
    renderRegister();
    fireEvent.change(screen.getByLabelText(/choose your subdomain/i), {
      target: { value: "admin" },
    });

    await screen.findByText(/is reserved by MyWora/i, undefined, { timeout: 3000 });
    expect(screen.getByRole("button", { name: "Reserved" })).toBeDisabled();
  });

  it("disables the availability check for invalid subdomains", () => {
    renderRegister();
    fireEvent.change(screen.getByLabelText(/choose your subdomain/i), {
      target: { value: "ab" },
    });
    expect(screen.getByRole("button", { name: /check availability/i })).toBeDisabled();
  });
});

describe("Wizard flow", () => {
  it("blocks continuing with empty fields and surfaces every error", () => {
    renderRegister();
    fireEvent.click(screen.getByRole("button", { name: /continue to owner account/i }));

    expect(screen.getByText(/business name is required/i)).toBeInTheDocument();
    expect(screen.getByText(/select a business type/i)).toBeInTheDocument();
    expect(screen.getByText(/phone number is required/i)).toBeInTheDocument();
    expect(screen.getByText(/city is required/i)).toBeInTheDocument();
    expect(screen.getByText(/subdomain is required/i)).toBeInTheDocument();
  });

  it("supports stepping back via the stepper", async () => {
    renderRegister();
    fillStepOne();
    await screen.findByText(/is ready to reserve/i, undefined, { timeout: 3000 });

    fireEvent.click(screen.getByRole("button", { name: /continue to owner account/i }));
    expect(await screen.findByRole("heading", { name: "Owner Account" })).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /step 1: business information/i }));
    expect(screen.getByRole("heading", { name: "Business Information" })).toBeInTheDocument();
  });

  it("completes the full registration flow", async () => {
    renderRegister();
    fillStepOne();
    await screen.findByText(/is ready to reserve/i, undefined, { timeout: 3000 });

    fireEvent.click(screen.getByRole("button", { name: /continue to owner account/i }));
    expect(await screen.findByRole("heading", { name: "Owner Account" })).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Ali Raza" } });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "ali@falconmotors.pk" },
    });
    fireEvent.change(screen.getByPlaceholderText("Create a strong password"), {
      target: { value: "Str0ng!Pass" },
    });
    fireEvent.change(screen.getByPlaceholderText("Re-enter your password"), {
      target: { value: "Str0ng!Pass" },
    });
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /continue to review/i }));

    expect(await screen.findByRole("heading", { name: "Review & Confirm" })).toBeInTheDocument();
    expect(screen.getByText("Falcon Motors")).toBeInTheDocument();
    expect(screen.getByText("ali@falconmotors.pk")).toBeInTheDocument();
    // Review row shows the full URL; the live preview rail shows it in segments.
    expect(screen.getByText("https://falcon-motors.mywora.com")).toBeInTheDocument();
    expect(screen.getByText("falcon-motors")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.click(screen.getByRole("button", { name: /confirm & finish setup/i }));

    expect(await screen.findByText(/workspace setup complete/i)).toBeInTheDocument();
    // Honest terminal state: nothing is stored in this phase.
    expect(screen.getByText(/validated locally/i)).toBeInTheDocument();
    expect(screen.queryByText("Ali Raza")).not.toBeInTheDocument();
  });
});
