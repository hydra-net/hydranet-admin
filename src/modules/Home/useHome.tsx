import { useWeb3 } from "@chainsafe/web3-context";
import { useState } from "react";

const { REACT_APP_DEFAULT_NETWORK_ID, REACT_APP_CONTRACT_ADDRESS } =
  process.env;

export default function useHome() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { network } = useWeb3();
  const isWrongNetwork = network !== parseInt(REACT_APP_DEFAULT_NETWORK_ID!);

  return {
    isLoading,
    setIsLoading,
    isWrongNetwork,
  };
}
