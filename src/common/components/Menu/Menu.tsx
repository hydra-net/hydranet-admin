import React from "react";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import { getHorizontalGap } from "../../styles";
import { Label } from "../Label/Label";
import hydraLogo from "../../../assets/png/hydra-logo.png";
import bondLogo from "../../../assets/png/bond.png";

interface StyledMenuProps {
  open: boolean;
}
export const StyledMenu = styled.nav<StyledMenuProps>`
  display: flex;
  flex-direction: column;
  background: #0d1328;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(-100%)")};
  height: 100vh;
  text-align: left;
  padding: 2rem;
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
`;

const MenuLink = styled.div`
  display: flex;
  align-items: center;
  justify-items: center;
  align-content: center;
  ${getHorizontalGap("10px")};
  padding: 5rem 0;
  font-weight: bold;
  color: ${({ theme }) => theme.colors.white};
  text-decoration: none;
  transition: color 0.3s linear;
  cursor: pointer;
  @media (max-width: ${({ theme }) => theme.mobile}) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const StyledLabel = styled(Label)`
  font-size: 18px;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.primaryHover};
  }
`;

const TitleContainer = styled.div`
  display: flex;
  ${getHorizontalGap("10px")};
`;

const Title = styled(Label)`
  font-size: 24px;
  @media (max-width: ${({ theme }) => theme.maxWidth.md}) {
    display: none;
  }
`;

const Logo = styled.img`
  height: 24px;
  width: 24px;
`;

type Props = {
  open: boolean;
  props?: any;
};

const Menu = ({ open, props }: Props) => {
  const isHidden = open ? true : false;
  //   const tabIndex = isHidden ? 0 : -1;
  const { t } = useTranslation();
  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <TitleContainer>
        <Logo src={hydraLogo} alt="hydra logo" />
        <Title>{t("hydra-admin-title")}</Title>
      </TitleContainer>

      <MenuLink>
        <div>
          <img
            src={bondLogo}
            style={{ width: "25px", height: "auto" }}
            alt="Bond"
          />
        </div>

        <StyledLabel>Bonds</StyledLabel>
      </MenuLink>
    </StyledMenu>
  );
};
export default Menu;
