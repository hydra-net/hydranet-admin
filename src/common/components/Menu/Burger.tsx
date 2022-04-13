import React from "react";
import styled from "styled-components";

interface StyledBurgerProps {
  open: boolean;
}

export const StyledBurger = styled.button<StyledBurgerProps>`
  @media (min-width: 576px) {
    display: none;
  }

  position: absolute;
  top: 5%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  div {
    width: 2.25rem;
    height: 0.5rem;
    background: ${({ theme, open }) =>
      open ? theme.primaryDark : theme.primaryLight};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
    }
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;

type Props = {
  open: boolean;
  setOpen: (open: boolean) => void;
  props?: any;
};

const Burger = ({ open, setOpen, props }: Props) => {
  return (
    <StyledBurger
      aria-label="Toggle menu"
      aria-expanded={open ? true : false}
      open={open}
      onClick={() => setOpen(!open)}
      {...props}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
};

export default Burger;
