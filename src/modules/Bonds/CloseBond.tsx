import { useState } from "react";
import styled from "styled-components";
import { useTranslation } from "react-i18next";
import { Label } from "../../common/components/Label/Label";
import { ICloseBondFormValues } from "../../common/interfaces";
import { getEncodedCloseFunction } from "../../helpers/bondDepositoryHelper";
import { useWeb3 } from "@chainsafe/web3-context";
import { addresses, NetworkId } from "../../networkDetails";
import { toast } from "react-toastify";
import CustomToastWithLink from "../../common/components/TransLink/TransactionLink";
import { DEFAULT_NOTIFY_CONFIG } from "../../common/constants";
import { getTxHashShort, getTxUrl } from "../../common/web3/web3";
import CloseBondForm from "./CloseBondForm";

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

const CloseBond = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { provider, network, address } = useWeb3();

  const isWrongNetwork =
    NetworkId.ARBITRUM !== network &&
    NetworkId.ARBITRUM_TESTNET !== network &&
    NetworkId.RINKEBY !== network;

  const handleSubmit = async (values: ICloseBondFormValues) => {
    setIsLoading(true);
    try {
      const { id } = values;

      const data = getEncodedCloseFunction(id);

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
      console.error("Error closing bond", e);
      toast.error("Error closing bond", {
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
          <Title>{t("bonds.close-bond-title")}</Title>
        </TitleContainer>
        <CloseBondForm
          isLoading={isLoading}
          isFormDisabled={!address || isWrongNetwork}
          onSubmit={handleSubmit}
        />
      </Container>
    </Root>
  );
};

export default CloseBond;
