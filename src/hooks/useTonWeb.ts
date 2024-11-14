import { CHAIN } from "@tonconnect/ui-react";
import { useMemo } from "react";
import TonWeb from "tonweb"; // Ensure this import is correct

// Define your providers and API keys
const MAINNET_PROVIDER = "https://toncenter.com/api/v2/jsonRPC";
export const MAINNET_API_KEY = "0f8a8e977ddd64ae028c2a88495dff2681e783acd73eb4b6623a0ed3df8bfbc9";
const TESTNET_PROVIDER = "https://testnet.toncenter.com/api/v2/jsonRPC";
export const TESTNET_API_KEY = "93b5dbabd8d4b1b7403d74e1a1df9b0691c0c7e109cf0b6356a3ec53ca1b3c8f";

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
