import styled from "styled-components";
import { Button } from "../../common/components/Buttons/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { closeBondValidationSchema } from "./schema";
import { useTranslation } from "react-i18next";
import { ICloseBondFormValues } from "../../common/interfaces";
import BondInput from "./CreateBondInput";

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
  isFormDisabled: boolean;
  onSubmit: (data: ICloseBondFormValues) => void;
};

const CloseBondForm = ({
  isLoading,
  isFormDisabled,
  onSubmit,
}: CreateBondFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ICloseBondFormValues>({
    resolver: yupResolver(closeBondValidationSchema),
  });
  const onProcessSubmit = (data: ICloseBondFormValues) => {
    onSubmit(data);
  };

  const { t } = useTranslation();
  return (
    <form onSubmit={handleSubmit(onProcessSubmit)}>
      <BondInput
        name={"id"}
        label={t("bonds.bond-id")}
        placeholder={"eg. 5"}
        type={"number"}
        min="1"
        step="1"
        max={Number.MAX_SAFE_INTEGER}
        register={register}
        error={errors.id?.message}
        isDisabled={isLoading || isFormDisabled}
      />
      <StyledButton isDisabled={isLoading || isFormDisabled}>
        {isFormDisabled ? t("connect-wallet") : t("bonds.close-bond-btn")}
      </StyledButton>
    </form>
  );
};

export default CloseBondForm;
