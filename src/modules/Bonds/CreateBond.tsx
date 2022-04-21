import React, { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Label } from "../../common/components/Label/Label";
import CreateBondForm from "./CreateBondForm";
import { ICreateBondFormValues } from "../../common/interfaces";
import { getEncodedCreateFunction } from "../../helpers/bondDepositoryHelper";
import { useWeb3 } from "@chainsafe/web3-context";
import {
  addresses,
  arbitrumInfuraName,
  arbitrumRinkebyInfuraName,
  NetworkId,
  NETWORK_EXPLORER_URLS,
} from "../../networkDetails";
import { toast } from "react-toastify";
import { BigNumber } from "ethers";
import CustomToastWithLink from "../../common/components/TransLink/TransactionLink";
import { DEFAULT_NOTIFY_CONFIG } from "../../common/constants";
import { getWeb3Initialised } from "../../common/web3/web3";
import { parseUnits } from "ethers/lib/utils";

const Root = styled.div`
  display: flex;
  justify-content: center;
  align-tems: center;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 576px;
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 50px;
`;

const Title = styled(Label)`
  font-size: 20px;
  text-transform: uppercase;
`;

const CreateBond = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { provider, network, address } = useWeb3();
  const depositInterval = 60 * 60 * 24;
  const timeToConclusionFixed = 24 * 60 * 60;
  const buffer = 100000;

  const handleSubmit = async (values: ICreateBondFormValues) => {
    setIsLoading(true);
    try {
      const { quoteToken, capacity, price, ending } = values;

      const capacityBig = parseUnits(capacity.toString(), 18);
      const priceBig = BigNumber.from(price);
      const bufferBig = BigNumber.from(buffer);

      const marketArr = [capacityBig, priceBig, bufferBig];
      const booleansArr = [true, true];

      const web3 = getWeb3Initialised(
        network === NetworkId.ARBITRUM
          ? arbitrumInfuraName
          : arbitrumRinkebyInfuraName
      );

      const blockTimestamp = Number(
        (await web3.eth.getBlock(await web3.eth.getBlockNumber())).timestamp
      );

      const timeToConclusion = timeToConclusionFixed * ending;
      const vesting = timeToConclusion;
      const conclusion = blockTimestamp + timeToConclusion;
      const termsArr = [vesting, conclusion];

      const tuneInterval = timeToConclusion;
      const intervalsArr = [depositInterval, tuneInterval];
      const data = getEncodedCreateFunction(
        quoteToken,
        marketArr,
        booleansArr,
        termsArr,
        intervalsArr
      );

      const singer = provider?.getUncheckedSigner();
      const tx = await singer!.sendTransaction({
        data,
        to: addresses[network!].BOND_DEPOSITORY,
        from: address!,
      });

      let transUrl =
        network === NetworkId.ARBITRUM
          ? `${NETWORK_EXPLORER_URLS[NetworkId.ARBITRUM]}/tx/${tx.hash}`
          : `${NETWORK_EXPLORER_URLS[NetworkId.ARBITRUM_TESTNET]}/tx/${
              tx.hash
            }`;
      toast.success(
        <CustomToastWithLink
          href={transUrl}
          text={
            tx.hash.substring(0, 4) +
            "..." +
            tx.hash.substring(tx.hash.length - 4, tx.hash.length)
          }
        />,
        {
          ...DEFAULT_NOTIFY_CONFIG,
          autoClose: false,
        }
      );
    } catch (e) {
      console.error("Error creating bond", e);
      toast.error("Error creating bond", {
        ...DEFAULT_NOTIFY_CONFIG,
        autoClose: false,
      });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Root>
      <Container>
        <TitleContainer>
          <Title>{t("bonds.create-bond-title")}</Title>
        </TitleContainer>
        <CreateBondForm
          network={network!}
          isLoading={isLoading}
          isFormDisabled={!address}
          onSubmit={handleSubmit}
        />
      </Container>
    </Root>
  );
};

export default CreateBond;
