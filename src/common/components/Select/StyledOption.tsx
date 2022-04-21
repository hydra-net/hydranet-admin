import styled from "styled-components";
import { theme } from "../../../shell/theme/theme";

export const StyledOption = styled.option`
  font-size: ${theme.paragraph.md};
  background-color: #0d1328;

  &:before {
    content: ">";
    background-color: red;
    color: ${theme.colors.white};
    padding: 1.1rem 1.6rem;
    border-width: 2px;
    border-style: solid;
    border-color: ${theme.colors.blue.lighter};
    border-radius: ${theme.borderRadius.lg};
  }
`;
