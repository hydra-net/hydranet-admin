const { REACT_APP_INFURA_ID } = process.env;

export enum NetworkId {
  ARBITRUM = 42161,
  ARBITRUM_TESTNET = 421611,
  RINKEBY = 4,
}

interface IAddresses {
  [key: number]: { [key: string]: string };
}

export const addresses: IAddresses = {
  [NetworkId.ARBITRUM]: {
    DAI_ADDRESS: "0xda10009cbd5d07dd0cecc66161fc93d7c9000da1",
    WETH_ADDRESS: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
    BOND_DEPOSITORY: "0xE71d46c6B1ecD2812c11E52Cfb28a4AE3AEa6580",
    NETWORK_NAME: "arbitrum-mainnet",
    EXPLORER_URL: "https://arbiscan.io/",
    INFURA_URI: `https://arbitrum-mainnet.infura.io/v3/${REACT_APP_INFURA_ID!}`,
  },
  [NetworkId.ARBITRUM_TESTNET]: {
    DAI_ADDRESS: "0x0eEf05a0CA8847BdB762F687F8fDFA1F24cFF43A",
    WETH_ADDRESS: "0xB47e6A5f8b33b3F17603C83a0535A9dcD7E32681",
    BOND_DEPOSITORY: "0x0AA742F6cB7B07b66b6714cC6378B41904C158f4",
    NETWORK_NAME: "arbitrum-rinkeby",
    EXPLORER_URL: "https://testnet.arbiscan.io/",
    INFURA_URI: `https://arbitrum-rinkeby.infura.io/v3/${REACT_APP_INFURA_ID!}`,
  },
  [NetworkId.RINKEBY]: {
    DAI_ADDRESS: "0xb2180448f8945c8cc8ae9809e67d6bd27d8b2f2c",
    WETH_ADDRESS: "0xc778417E063141139Fce010982780140Aa0cD5Ab",
    BOND_DEPOSITORY: "0x3e7331ccB7AF79b0a50828961e804212C1c55A59",
    NETWORK_NAME: "rinkeby",
    EXPLORER_URL: "https://rinkeby.etherscan.io/",
    INFURA_URI: `https://rinkeby.infura.io/v3/${REACT_APP_INFURA_ID!}`,
  },
};
