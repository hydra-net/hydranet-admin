export enum NetworkId {
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421611,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  [NetworkId.ARBITRUM]: {
    DAI_ADDRESS: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    WETH_ADDRESS: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    BOND_DEPOSITORY: "0xE71d46c6B1ecD2812c11E52Cfb28a4AE3AEa6580",
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    DAI_ADDRESS: "0x0eEf05a0CA8847BdB762F687F8fDFA1F24cFF43A",
    WETH_ADDRESS: "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681",
    BOND_DEPOSITORY: "0x0AA742F6cB7B07b66b6714cC6378B41904C158f4",
  },
};

export const arbitrumInfuraName = "arbitrum-mainnet";
export const arbitrumRinkebyInfuraName = "arbitrum-rinkeby";

export const NETWORK_EXPLORER_URLS: { [key in NetworkId]: string } = {
  [NetworkId.ARBITRUM]: `https://arbiscan.io/`,
  [NetworkId.ARBITRUM_TESTNET]: `https://testnet.arbiscan.io/`,
};
