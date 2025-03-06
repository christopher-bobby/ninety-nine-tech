import { render, screen } from "@testing-library/react";
import SwapResult from "../index";
import { describe, it, expect } from "vitest";

describe("SwapResult Component", () => {
  // Mock data for testing
  const mockResult = {
    fromToken: "ETH",
    toToken: "BTC",
    exchangeRate: 0.05,
    receivedAmount: 0.5,
  };

  const mockGetTokenIcon = (currency: string) =>
    `https://example.com/tokens/${currency}.svg`;

  it("renders nothing when result is null", () => {
    render(<SwapResult result={null} getTokenIcon={mockGetTokenIcon} />);
    const resultContainer = screen.queryByTestId("result-container");
    expect(resultContainer).toBeNull();
  });

  it("renders the swap result correctly", () => {
    render(<SwapResult result={mockResult} getTokenIcon={mockGetTokenIcon} />);

    // Check if the result container is rendered
    const resultContainer = screen.getByTestId("result-container");
    expect(resultContainer).toBeInTheDocument();

    // Check if the from token is displayed correctly
    const fromToken = screen.getByText("ETH");
    expect(fromToken).toBeInTheDocument();

    // Check if the to token is displayed correctly
    const toToken = screen.getByText("0.5000 BTC");
    expect(toToken).toBeInTheDocument();

    // Check if the exchange rate is displayed correctly
    const exchangeRate = screen.getByText("Exchange Rate: 0.0500");
    expect(exchangeRate).toBeInTheDocument();

    // Check if the token icons are rendered correctly
    const fromTokenIcon = screen.getByAltText("ETH");
    expect(fromTokenIcon).toHaveAttribute(
      "src",
      "https://example.com/tokens/ETH.svg"
    );

    const toTokenIcon = screen.getByAltText("BTC");
    expect(toTokenIcon).toHaveAttribute(
      "src",
      "https://example.com/tokens/BTC.svg"
    );
  });
});