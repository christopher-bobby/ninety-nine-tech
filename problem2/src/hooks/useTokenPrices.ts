import { useEffect, useState } from "react";

interface TokenPrice {
  currency: string;
  date: string;
  price: number;
}

// Fetch token prices from the API
const fetchPrices = async (): Promise<TokenPrice[]> => {
  const response = await fetch("https://interview.switcheo.com/prices.json");
  const data = await response.json();
  return data;
};

const useTokenPrices = () => {
  const [prices, setPrices] = useState<TokenPrice[]>([]);

  useEffect(() => {
    fetchPrices().then((data) => setPrices(data));
  }, []);

  return prices;
};

export default useTokenPrices;