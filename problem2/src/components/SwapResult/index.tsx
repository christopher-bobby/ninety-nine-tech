import "./index.css"; 


interface SwapResultProps {
  fromTokenAmount?: number;
  result: {
    fromToken: string;
    toToken: string;
    exchangeRate: number;
    receivedAmount: number;
  } | null;
  getTokenIcon: (currency: string) => string; // Function to get token icon URL
}

const SwapResult: React.FC<SwapResultProps> = ({ fromTokenAmount, result, getTokenIcon }) => {
    if (!result) return null; // Don't render if there's no result
  
    return (
      <div className="result-container" data-testid="result-container">
        <h4>Swap Result</h4>
        <div className="result-tokens">
          <div className="token-display">
            <img
              src={getTokenIcon(result.fromToken)}
              alt={result.fromToken}
              className="token-icon"
            />
            <span>{fromTokenAmount} {result.fromToken}</span>
          </div>
          <span className="arrow">→</span>
          <div className="token-display">
            <img
              src={getTokenIcon(result.toToken)}
              alt={result.toToken}
              className="token-icon"
            />
            <span>{result.receivedAmount.toFixed(4)} {result.toToken}</span>
          </div>
        </div>
        <p>Exchange Rate: {result.exchangeRate.toFixed(4)}</p>
      </div>
    );
  };
  
  export default SwapResult;