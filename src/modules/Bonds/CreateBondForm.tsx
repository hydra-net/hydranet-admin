import styled from "styled-components";
import { Button } from "../../common/components/Buttons/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { createBondValidationSchema } from "./schema";
import { useTranslation } from "react-i18next";
import { ICreateBondFormValues } from "../../common/interfaces";
import BondInput from "./CreateBondInput";
import CreateBondSelect from "./CreateBondSelect";

const StyledButton = styled(Button)`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  text-transform: uppercase;
`;

type CreateBondFormProps = {
  isLoading: boolean;
  network: number;
  isFormDisabled: boolean;
  onSubmit: (data: ICreateBondFormValues) => void;
};

const CreateBondForm = ({
  isLoading,
  isFormDisabled,
  network,
  onSubmit,
}: CreateBondFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICreateBondFormValues>({
    resolver: yupResolver(createBondValidationSchema),
  });
  const onProcessSubmit = (data: ICreateBondFormValues) => {
    onSubmit(data);
  };

  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onProcessSubmit)}>
      <CreateBondSelect
        name={"quoteToken"}
        isLoading={isLoading}
        isFormDisabled={isFormDisabled}
        network={network}
        register={register}
        error={errors.quoteToken?.message}
      />
      <BondInput
        name={"capacity"}
        label={t("bonds.capacity")}
        type={"number"}
        min="0.0000"
        step="0.001"
        max={Number.MAX_SAFE_INTEGER}
        register={register}
        placeholder={"eg. 300 for DAI or 0.5 for ETH"}
        error={errors.capacity?.message}
        isDisabled={isLoading || isFormDisabled}
      />

      <BondInput
        name={"price"}
        label={t("bonds.price")}
        placeholder={"eg. 19550000 for DAI or 5560 for ETH, max 9 digits"}
        type={"number"}
        min="1"
        step="1"
        max={999999999}
        register={register}
        error={errors.price?.message}
        isDisabled={isLoading || isFormDisabled}
      />

      <BondInput
        name={"ending"}
        label={t("bonds.ending")}
        placeholder={"eg. 5"}
        type={"number"}
        min="1"
        step="1"
        max={Number.MAX_SAFE_INTEGER}
        register={register}
        error={errors.ending?.message}
        isDisabled={isLoading || isFormDisabled}
      />
      <StyledButton isDisabled={isLoading || isFormDisabled}>
        {isFormDisabled ? t("connect-wallet") : t("bonds.create-bond-btn")}
      </StyledButton>
    </form>
  );
};

export default CreateBondForm;
