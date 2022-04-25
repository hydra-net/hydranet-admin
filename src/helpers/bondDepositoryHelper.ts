import { ethers } from "ethers";
import { Interface } from "ethers/lib/utils";
import bondDepositoryAbi from "../common/abis/bond-depository-abi";
import {
  getArbitrumProvider,
  getArbitrumRinkebyProvider,
} from "../common/web3/web3";
import { addresses, NetworkId } from "../networkDetails";

const BOND_DEPOSITORY_INTERFACE = new Interface(bondDepositoryAbi);

export const getBondDepositoryContract = (networkId: number) => {
  return new ethers.Contract(
    addresses[networkId].BOND_DEPOSITORY,
    bondDepositoryAbi,
    networkId === NetworkId.ARBITRUM
      ? getArbitrumProvider()
      : getArbitrumRinkebyProvider()
  );
};

export const getEncodedCreateFunction = (
  quoteToken: string,
  market: string[],
  booleans: boolean[],
  terms: number[],
  intervals: number[]
): string => {
  return BOND_DEPOSITORY_INTERFACE.encodeFunctionData("create", [
    quoteToken,
    market,
    booleans,
    terms,
    intervals,
  ]);
};
