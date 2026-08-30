import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Button from "./Button";

function renderWithRouter(ui: ReactElement) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("Button", () => {
  it("renders children and fires onClick", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Start Free</Button>);

    fireEvent.click(screen.getByRole("button", { name: /start free/i }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("renders an internal link when `to` is provided", () => {
    renderWithRouter(<Button to="/signup">Start Free</Button>);
    expect(screen.getByRole("link", { name: /start free/i })).toHaveAttribute("href", "/signup");
  });

  it("renders an anchor when `href` is provided", () => {
    render(<Button href="#pricing">See Pricing</Button>);
    expect(screen.getByRole("link", { name: /see pricing/i })).toHaveAttribute("href", "#pricing");
  });

  it("shows a spinner and disables interaction while loading", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Saving
      </Button>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(screen.getByRole("status")).toBeInTheDocument();

    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("can be disabled explicitly", () => {
    render(
      <Button disabled onClick={() => undefined}>
        Save
      </Button>,
    );
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
