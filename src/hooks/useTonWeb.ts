import { CHAIN } from "@tonconnect/ui-react";
import { useMemo } from "react";
import TonWeb from "tonweb"; // Ensure this import is correct

// Define your providers and API keys
const MAINNET_PROVIDER = "https://mainnet.ton.dev";
const MAINNET_API_KEY = "your-mainnet-api-key";
const TESTNET_PROVIDER = "https://testnet.ton.dev";
const TESTNET_API_KEY = "your-testnet-api-key";

// Initialize TonWeb based on the network
const useTonWeb = (network: CHAIN | null) => {
  return useMemo(() => {
    if (!network) return null;

    return new TonWeb(
      new TonWeb.HttpProvider(
        network === CHAIN.MAINNET ? MAINNET_PROVIDER : TESTNET_PROVIDER,
        {
          apiKey: network === CHAIN.MAINNET ? MAINNET_API_KEY : TESTNET_API_KEY,
        }
      )
    );
  }, [network]);
};

export default useTonWeb;
