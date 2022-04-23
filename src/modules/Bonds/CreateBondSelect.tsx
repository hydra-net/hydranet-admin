import { Path, UseFormRegister } from "react-hook-form";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { Label } from "../../common/components/Label/Label";
import { StyledOption } from "../../common/components/Select/StyledOption";
import { StyledSelect } from "../../common/components/Select/StyledSelect";
import { ICreateBondFormValues } from "../../common/interfaces";
import { addresses } from "../../networkDetails";
import { theme } from "../../shell/theme/theme";

const Root = styled.div`
  margin-bottom: 10px;
`;
const StyledSelectWrapper = styled.div`
  position: relative;

  &:after {
    content: "▼";
    color: ${theme.colors.white};
    font-size: 1.5rem;
    top: 13px;
    right: 10px;
    position: absolute;
  }
`;
const SelectLabelWrapper = styled.div`
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
      <SelectLabelWrapper>
        <SelectLabel>{t("bonds.token")}</SelectLabel>
      </SelectLabelWrapper>

      <StyledSelectWrapper className="select-wrapper">
        <StyledSelect
          id={name}
          {...register(name)}
          disabled={isLoading || isFormDisabled}
        >
          <StyledOption value="" disabled selected>
            {t("bonds.select-bond-token")}
          </StyledOption>
          <StyledOption value={addresses[network].DAI_ADDRESS}>
            {t("bonds.dai")}
          </StyledOption>
          <StyledOption value={addresses[network].WETH_ADDRESS}>
            {t("bonds.weth")}
          </StyledOption>
        </StyledSelect>
      </StyledSelectWrapper>

      {error && <StyledError>{error}</StyledError>}
    </Root>
  );
};

export default CreateBondSelect;
