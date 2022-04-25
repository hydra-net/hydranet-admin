import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Label } from "../../common/components/Label/Label";
import CreateBondForm from "./CreateBondForm";
import { ICreateBondFormValues } from "../../common/interfaces";
import { getEncodedCreateFunction } from "../../helpers/bondDepositoryHelper";
import { useWeb3 } from "@chainsafe/web3-context";
import { addresses, NetworkId } from "../../networkDetails";
import { toast } from "react-toastify";
import { BigNumber, BigNumberish } from "ethers";
import CustomToastWithLink from "../../common/components/TransLink/TransactionLink";
import { DEFAULT_NOTIFY_CONFIG } from "../../common/constants";
import { getTxHashShort, getTxUrl } from "../../common/web3/web3";

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
  const [networkId, setNetworkId] = useState<number>(42161);
  const { provider, network, address } = useWeb3();

  const isWrongNetwork =
    NetworkId.ARBITRUM !== network &&
    NetworkId.ARBITRUM_TESTNET !== network &&
    NetworkId.RINKEBY !== network;

  useEffect(() => {
    if (network && !isWrongNetwork) {
      setNetworkId(network!);
    }
  }, [isWrongNetwork, network]);

  // const bond params
  const depositInterval = BigNumber.from(24 * 60 * 60);
  const timeToConclusionFixed = 24 * 60 * 60;
  const buffer = BigNumber.from("100000");
  const booleansArr = [true, true];

  const handleSubmit = async (values: ICreateBondFormValues) => {
    setIsLoading(true);
    try {
      const { quoteToken, capacity, price, ending } = values;

      const marketArr: BigNumberish[] = [
        BigNumber.from(capacity),
        BigNumber.from(price.toString()),
        buffer,
      ];

      const timeToConclusion = timeToConclusionFixed * ending;
      const vesting = BigNumber.from(timeToConclusion);
      const conclusion =
        Math.round(new Date().getTime() / 1000) + timeToConclusion;
      const termsArr = [vesting, BigNumber.from(conclusion)];

      const tuneInterval = BigNumber.from(timeToConclusion);
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

      let transUrl = getTxUrl(network!, tx.hash);

      toast.success(
        <CustomToastWithLink href={transUrl} text={getTxHashShort(tx.hash)} />,
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
          network={networkId}
          isLoading={isLoading}
          isFormDisabled={!address || isWrongNetwork}
          onSubmit={handleSubmit}
        />
      </Container>
    </Root>
  );
};

export default CreateBond;
