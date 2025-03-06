import { render, screen } from "@testing-library/react";
import Footer from "../index";
import { describe, it, expect } from "vitest";

describe("Footer Component", () => {
  it("renders the current year correctly", () => {
    render(<Footer />);

    // Get the current year
    const currentYear = new Date().getFullYear();

    // Check that the footer text contains the current year
    const footerText = screen.getByText(`© ${currentYear} Token Swap. All rights reserved.`);
    expect(footerText).toBeInTheDocument();
  });

  it("renders the footer with the correct class name", () => {
    render(<Footer />);

    // Check that the footer element has the correct class name
    const footerElement = screen.getByRole("contentinfo");
    expect(footerElement).toHaveClass("footer");
  });
});