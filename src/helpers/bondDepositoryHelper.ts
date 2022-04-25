import { BigNumberish, ethers } from "ethers";
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
  market: BigNumberish[],
  booleans: boolean[],
  terms: BigNumberish[],
  intervals: BigNumberish[]
): string => {
  return BOND_DEPOSITORY_INTERFACE.encodeFunctionData("create", [
    quoteToken,
    market,
    booleans,
    terms,
    intervals,
  ]);
};

export const getEncodedCloseFunction = (_id: number): string => {
  return BOND_DEPOSITORY_INTERFACE.encodeFunctionData("close", [_id]);
};
