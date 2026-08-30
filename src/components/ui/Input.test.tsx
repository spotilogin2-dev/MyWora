import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Input from "./Input";

describe("Input", () => {
  it("associates the label with the input", () => {
    render(<Input label="Workshop name" placeholder="FA Auto" />);
    expect(screen.getByLabelText("Workshop name")).toHaveAttribute("placeholder", "FA Auto");
  });

  it("marks required fields", () => {
    render(<Input label="Workshop name" required />);
    expect(screen.getByLabelText(/workshop name/i)).toBeRequired();
  });

  it("shows the error and exposes an invalid state", () => {
    render(<Input label="Email" error="Enter a valid email" />);

    expect(screen.getByLabelText(/email/i)).toBeInvalid();
    expect(screen.getByText("Enter a valid email")).toBeInTheDocument();
  });

  it("shows the hint when there is no error", () => {
    render(<Input label="Email" hint="We never share your email." />);
    expect(screen.getByText("We never share your email.")).toBeInTheDocument();
  });
});
