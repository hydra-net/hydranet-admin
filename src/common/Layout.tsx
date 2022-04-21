import { ReactNode } from "react";
import styled, { ThemeProvider } from "styled-components";
import Web3Wrapper from "./Web3Wrapper";
import { GlobalStyle } from "../shell/theme/globalStyle";
import Navbar from "./components/Navbar/Navbar";
import { theme } from "../shell/theme/theme";
import { devicesUp } from "../media";

interface ILayoutProps {
  theme: any;
  children: ReactNode;
}
const Root = styled.div`
  min-height: 100vh;
  min-width: 100vw;
  background: url("./hydra-background.svg") no-repeat fixed center center;
  background-size: cover;
  padding: ${theme.margin.lg} 0;

  @media only screen and ${devicesUp.md} {
    padding: 4rem 0 4rem 0;
  }
`;

const Layout = ({ theme, children }: ILayoutProps) => {
  return (
    <ThemeProvider theme={{ ...theme }}>
      <GlobalStyle />

      <Web3Wrapper>
        <Root>
          <Navbar />
          {children}
        </Root>
      </Web3Wrapper>
    </ThemeProvider>
  );
};

export default Layout;
