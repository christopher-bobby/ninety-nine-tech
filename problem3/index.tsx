import React, { useMemo, useCallback } from 'react';

interface WalletBalance {
  currency: string;
  amount: number;
  blockchain: string;
}

interface Props {
  [key: string]: any;
}

// Mock implementations
const useWalletBalances = (): WalletBalance[] => [
  { currency: 'Osmosis', amount: 100, blockchain: 'Osmosis' },
  { currency: 'Ethereum', amount: 200, blockchain: 'Ethereum' },
  { currency: 'Arbitrum', amount: 50, blockchain: 'Arbitrum' },
  { currency: 'Zilliqa', amount: 0, blockchain: 'Zilliqa' }, // Filtered out
];

const usePrices = (): Record<string, number> => ({
  Osmosis: 1.5,
  Ethereum: 3000,
  Arbitrum: 2.5,
});

// WalletRow Component with Proper Types
interface WalletRowProps {
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({ amount, usdValue, formattedAmount }) => (
  <div>
    <p>Amount: {amount}</p>
    <p>USD Value: {usdValue}</p>
    <p>Formatted Amount: {formattedAmount}</p>
    <hr />
  </div>
);

const WalletPage: React.FC<Props> = (props) => {
  const { ...rest } = props;
  const balances = useWalletBalances();
  const prices = usePrices();

  const getPriority = useCallback((blockchain: string): number => {
    switch (blockchain) {
      case 'Osmosis':
        return 100;
      case 'Ethereum':
        return 50;
      case 'Arbitrum':
        return 30;
      case 'Zilliqa':
      case 'Neo':
        return 20;
      default:
        return -99;
    }
  }, []);

  const sortedBalances = useMemo(() => {
    return balances
      .filter((balance) => getPriority(balance.blockchain) > -99 && balance.amount > 0)
      .sort((lhs, rhs) => getPriority(rhs.blockchain) - getPriority(lhs.blockchain));
  }, [balances, getPriority]);

  return (
    <div {...rest}>
      {sortedBalances.map(({ currency, amount }) => (
        <WalletRow
          key={`${currency}-${amount}`}
          amount={amount}
          usdValue={(prices[currency] || 0) * amount}
          formattedAmount={amount.toFixed()}
        />
      ))}
    </div>
  );
};

export default WalletPage;
