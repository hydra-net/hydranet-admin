import { StyledInput } from "../../common/components/Input/styles";
import { Path } from "react-hook-form";
import { getVerticalGap } from "../../common/styles";
import { Label } from "../../common/components/Label/Label";
import styled from "styled-components";
import {
  ICloseBondFormValues,
  ICreateBondFormValues,
} from "../../common/interfaces";

const StyledInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  ${getVerticalGap("5px")};
  margin-bottom: 10px;
  width: 100%;
`;

const InputLabel = styled(Label)`
  opacity: 0.7;
  text-transform: uppercase;
`;

const StyledError = styled.p`
  color: red;
  font-size: 12px;
`;

type BondInputProps = {
  label: string;
  type?: string;
  min?: string | number | undefined;
  step?: string | number | undefined;
  max?: string | number | undefined;
  name: Path<ICreateBondFormValues | ICloseBondFormValues>;
  placeholder?: string;
  error: string | undefined;
  isDisabled: boolean;
  register: any;
};

const BondInput = ({
  label,
  type = "string",
  min,
  step,
  max,
  placeholder,
  name,
  isDisabled,
  error,
  register,
}: BondInputProps) => (
  <StyledInputWrapper>
    <InputLabel>{label}</InputLabel>
    <StyledInput
      min={min}
      step={step}
      max={max}
      type={type}
      placeholder={placeholder}
      disabled={isDisabled}
      {...register(name)}
    />
    {error && <StyledError>{error}</StyledError>}
  </StyledInputWrapper>
);

export default BondInput;
