import React from "react";
import { useWeb3 } from "@chainsafe/web3-context";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Button } from "../Buttons/Button";
import Icon from "../Icon/Icon";
import { theme } from "../../../shell/theme/theme";
import { DEFAULT_NOTIFY_CONFIG } from "../../constants";
import { formatWalletAddress } from "../../../helpers/walletHelper";
import { NetworkId } from "../../../networkDetails";

const ConnectWallet = () => {
  const { onboard, wallet, address = "", network } = useWeb3();
  const { t } = useTranslation();

  const isWrongNetwork =
    NetworkId.ARBITRUM !== network &&
    NetworkId.ARBITRUM_TESTNET !== network &&
    NetworkId.RINKEBY !== network;

  const handleConnectWallet = async () => {
    if (!wallet) {
      await onboard?.walletSelect();
    }
    await onboard?.walletCheck();
  };

  const handleCopyAddress = (evt: React.MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();
    evt.stopPropagation();
    if (!isWrongNetwork) {
      navigator.clipboard.writeText(address).then(
        () => {
          toast.info(t("notification.copied"), {
            ...DEFAULT_NOTIFY_CONFIG,
            autoClose: 1000,
            pauseOnHover: false,
          });
        },
        (err) => {
          toast.error(`${t("notification.error-copy")} ${address} `, {
            ...DEFAULT_NOTIFY_CONFIG,
            autoClose: false,
          });
          console.error("Could not copy text: ", err);
        }
      );
    }
  };

  if (!address) {
    return <Button onClick={handleConnectWallet}>{t("connect-wallet")}</Button>;
  }
  return (
    <div>
      <Button onClick={handleCopyAddress}>
        {formatWalletAddress(isWrongNetwork, address)}
        {!isWrongNetwork && (
          <span className={"btn-icon"}>
            <Icon
              color={theme.colors.white}
              width={"2.1rem"}
              height={"2.1rem"}
              name={"copy"}
            />
          </span>
        )}
      </Button>
    </div>
  );
};

export default ConnectWallet;
