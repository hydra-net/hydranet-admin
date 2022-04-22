import { Web3Provider } from "@chainsafe/web3-context";
import { ReactNode } from "react";
import { walletHelper } from "../helpers/walletHelper";
import { SUPPORTED_NETOWRKS } from "./constants";

const wallets = [
  {
    walletName: "walletConnect",
    preferred: true,
    rpc: {
      42161: "https://arb1.arbitrum.io/rpc",
      421611: "https://rinkeby.arbitrum.io/rpc",
      4: "https://rinkeby.infura.io/v3",
    },
  },
  { walletName: "metamask", preferred: true },
];

interface Web3WrapperProps {
  children: ReactNode;
}

const Web3Wrapper = ({ children }: Web3WrapperProps) => {
  return (
    <Web3Provider
      networkIds={SUPPORTED_NETOWRKS}
      onboardConfig={{
        darkMode: true,

        walletSelect: {
          wallets,
        },
        subscriptions: {
          wallet: (wallet: any) => {
            if (wallet) {
              // append wallet to wallet list
              const walletList = walletHelper.getLocalWallets();
              if (wallet.name && !walletList.includes(wallet.name)) {
                walletList.push(wallet.name!);
              }
              walletHelper.setLocalWallets(walletList);
            }
          },
        },
      }}
    >
      {children}
    </Web3Provider>
  );
};

export default Web3Wrapper;
