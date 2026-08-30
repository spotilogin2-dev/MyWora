import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import Badge from "./Badge";

describe("Badge", () => {
  it("renders its label with the requested tone", () => {
    render(<Badge tone="success">Paid</Badge>);
    expect(screen.getByText("Paid")).toHaveClass("bg-success-50", "text-success-600");
  });

  it("supports the small size", () => {
    render(
      <Badge tone="brand" size="sm">
        Soon
      </Badge>,
    );
    expect(screen.getByText("Soon")).toHaveClass("text-[10px]");
  });
});
