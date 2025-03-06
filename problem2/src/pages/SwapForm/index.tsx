import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { NumericFormat } from "react-number-format";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Select from "react-select"; 
import useTokenPrices from "../../hooks/useTokenPrices";
import SwapResult from "../../components/SwapResult"; 
import Loading from "../../components/Loading";
import "./index.css";

// Define the schema using Zod
const swapSchema = z.object({
  fromToken: z.string().min(1, "Select a token to send"),
  toToken: z.string().min(1, "Select a token to receive"),
  amount: z.number().min(0.01, "Amount must be at least 0.01"),
});

type SwapFormData = z.infer<typeof swapSchema>;

// SwapForm Component
function SwapForm() {
  const prices = useTokenPrices();
  const [result, setResult] = useState<{
    fromToken: string;
    toToken: string;
    exchangeRate: number;
    receivedAmount: number;
  } | null>(null); 
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<SwapFormData>({
    resolver: zodResolver(swapSchema),
  });

  const uniquePrices = prices.filter(
    (token, index, self) =>
      index === self.findIndex((t) => t.currency === token.currency)
  );

  const tokenOptions = uniquePrices.map((token) => ({
    value: token.currency,
    label: (
      <div className="token-option">
        <img
          src={`https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${token.currency}.svg`}
          alt={token.currency}
          className="token-icon"
        />
        <span>{token.currency}</span>
      </div>
    ),
  }));

  const onSubmit: SubmitHandler<SwapFormData> = async (data) => {
    setIsLoading(true); // Start loading

    // Simulate an async operation (e.g., API call)
    setTimeout(() => {
      const fromTokenPrice =
        uniquePrices.find((token) => token.currency === data.fromToken)?.price || 1;
      const toTokenPrice =
        uniquePrices.find((token) => token.currency === data.toToken)?.price || 1;

      const exchangeRate = fromTokenPrice / toTokenPrice;
      const receivedAmount = data.amount * exchangeRate;

      // Set the result in state
      setResult({
        fromToken: data.fromToken,
        toToken: data.toToken,
        exchangeRate,
        receivedAmount,
      });

      setIsLoading(false); // Stop loading
    }, 300); // Simulate a delay
  };

  // Function to get the token icon URL
  const getTokenIcon = (currency: string) => {
    return `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${currency}.svg`;
  };
  const fromTokenAmount = getValues("amount");

  return (
    <div className="app-container">
      {/* Swap Form */}
      <div className="swap-form-container">
        <div className="swap-form">
          <h5>Swap Tokens</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* From Token */}
            <div className="form-group">
              <label htmlFor="fromToken">From Token</label>
              <Select
                options={tokenOptions}
                className="custom-select"
                classNamePrefix="custom-select"
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("fromToken", selectedOption.value); // Set value for react-hook-form
                  }
                }}
                formatOptionLabel={(option) => option.label}
                placeholder="Select a token"
                id="fromToken"
              />
              {errors.fromToken && (
                <p className="error-message">{errors.fromToken.message}</p>
              )}
            </div>

            {/* To Token */}
            <div className="form-group">
              <label htmlFor="toToken">To Token</label>
              <Select
                options={tokenOptions}
                className="custom-select"
                classNamePrefix="custom-select"
                onChange={(selectedOption) => {
                  if (selectedOption) {
                    setValue("toToken", selectedOption.value); // Set value for react-hook-form
                  }
                }}
                formatOptionLabel={(option) => option.label}
                placeholder="Select a token"
                id="toToken"
              />
              {errors.toToken && (
                <p className="error-message">{errors.toToken.message}</p>
              )}
            </div>

            {/* Amount */}
            <div className="form-group">
              <label htmlFor="amount">Amount</label>
              <NumericFormat
                id="amount"
                className="amount-input"
                placeholder="Enter amount"
                thousandSeparator=","
                decimalScale={2}
                allowNegative={false}
                onValueChange={(values) => {
                  setValue("amount", values.floatValue || 0); // Update form value
                }}
              />
              {errors.amount && (
                <p className="error-message">{errors.amount.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-button" disabled={isLoading}>
              {isLoading ? "Processing..." : "CONFIRM SWAP"}
            </button>
          </form>

          {/* Display the result or loading state */}
          {isLoading ? (
            <Loading /> 
          ) : result ? (
            <SwapResult fromTokenAmount={fromTokenAmount} result={result} getTokenIcon={getTokenIcon} />
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SwapForm;