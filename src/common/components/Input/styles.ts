import styled from "styled-components";

import { devicesUp } from "../../../media";
import { theme } from "../../../shell/theme/theme";

export type StyledInputProps = {
  isLoading?: boolean;
  fontWeight?: number;
  fullWidth?: boolean;
  borderRadius?: string;
};

export const StyledInput = styled.input<StyledInputProps>`
  font-size: ${theme.paragraph.xl};
  color: ${theme.colors.white};
  background-color: ${theme.colors.blue.dark};
  width: 100%;
  padding: 1.1rem 1.6rem;
  border-width: 2px;
  border-style: solid;
  border-color: ${theme.colors.blue.lighter};
  border-radius: ${theme.borderRadius.lg};
  transition: border-color 300ms, color 300ms;

  @media only screen and ${devicesUp.lg} {
    font-size: ${theme.paragraph.md};
  }

  &::placeholder {
    color: ${theme.colors.white};
    opacity: 0.7;
  }

  &:focus,
  :focus-visible,
  :focus-within {
    outline: none;
    border-color: ${theme.colors.blue.light};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${theme.colors.white};
  }
`;
