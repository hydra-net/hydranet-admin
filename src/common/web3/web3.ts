import { ethers } from "ethers";
import Web3 from "web3";
import { addresses, NetworkId } from "../../networkDetails";

export const getInfuraUri = (network: number): string => {
  switch (network) {
    case 421611:
      return addresses[NetworkId.ARBITRUM_TESTNET].INFURA_URI;
    case 4:
      return addresses[NetworkId.RINKEBY].INFURA_URI;
    default:
      return addresses[NetworkId.ARBITRUM].INFURA_URI;
  }
};

export const getNetworkName = (network: number): string => {
  switch (network) {
    case 421611:
      return addresses[NetworkId.ARBITRUM_TESTNET].NETWORK_NAME;
    case 4:
      return addresses[NetworkId.RINKEBY].NETWORK_NAME;
    default:
      return addresses[NetworkId.ARBITRUM].NETWORK_NAME;
  }
};

export const getNetworkExplorer = (network: number): string => {
  switch (network) {
    case 421611:
      return addresses[NetworkId.ARBITRUM_TESTNET].EXPLORER_URL;
    case 4:
      return addresses[NetworkId.RINKEBY].EXPLORER_URL;
    default:
      return addresses[NetworkId.ARBITRUM].EXPLORER_URL;
  }
};

export const getTxUrl = (network: number, hash: string): string => {
  switch (network) {
    case 421611:
      return addresses[NetworkId.ARBITRUM_TESTNET].EXPLORER_URL + `/tx/${hash}`;
    case 4:
      return addresses[NetworkId.RINKEBY].EXPLORER_URL + `/tx/${hash}`;
    default:
      return addresses[NetworkId.ARBITRUM].EXPLORER_URL + `/tx/${hash}`;
  }
};

export const getTxHashShort = (hash: string) =>
  hash.substring(0, 4) + "..." + hash.substring(hash.length - 4, hash.length);

export const getBlockTimestamp = async (network: number): Promise<number> => {
  const web3 = getWeb3Initialised(network);
  return Number(
    (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp
  );
};

export const getWeb3Initialised = (network: number): Web3 =>
  new Web3(getInfuraUri(network));

export const getProvider = (networkId: number) => {
  return new ethers.providers.JsonRpcProvider(getInfuraUri(networkId), {
    chainId: networkId,
    name: getNetworkName(networkId),
  });
};

export const getArbitrumProvider = () => {
  return getProvider(NetworkId.ARBITRUM);
};

export const getArbitrumRinkebyProvider = () => {
  return getProvider(NetworkId.ARBITRUM_TESTNET);
};

export const getRINKEBYProvider = () => {
  return getProvider(NetworkId.RINKEBY);
};
