import { Path, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Label } from "../../common/components/Label/Label";
import { StyledOption } from "../../common/components/Select/StyledOption";
import { StyledSelect } from "../../common/components/Select/StyledSelect";
import { ICreateBondFormValues } from "../../common/interfaces";
import { addresses } from "../../networkDetails";

const Root = styled.div`
  margin-bottom: 5px;
`;

const SelectLabel = styled(Label)`
  opacity: 0.7;
  text-transform: uppercase;
`;

const StyledError = styled.p`
  color: red;
  font-size: 12px;
`;

type Props = {
  name: Path<ICreateBondFormValues>;
  isLoading: boolean;
  isFormDisabled: boolean;
  network: number;
  error?: string;
  register: UseFormRegister<ICreateBondFormValues>;
};

const CreateBondSelect = ({
  name,
  isLoading,
  isFormDisabled,
  network,
  error,
  register,
}: Props) => {
  const { t } = useTranslation();
  return (
    <Root>
      <SelectLabel>{t("select-bond-token")}</SelectLabel>
      <StyledSelect {...register(name)} disabled={isLoading || isFormDisabled}>
        <StyledOption value={addresses[network].DAI_ADDRESS}>DAI</StyledOption>
        <StyledOption value={addresses[network].WETH_ADDRESS}>
          WETH
        </StyledOption>
      </StyledSelect>
      {error && <StyledError>{error}</StyledError>}
    </Root>
  );
};

export default CreateBondSelect;
