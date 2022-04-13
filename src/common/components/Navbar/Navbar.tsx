import styled from "styled-components";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import Burger from "../Menu/Burger";
import Menu from "../Menu/Menu";
import { useRef, useState } from "react";
import FocusLock from "react-focus-lock";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";

const CustomFlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4.3rem;
  padding: 0 20px 0 20px;
`;

const Navbar = () => {
  const [open, setOpen] = useState(true);
  const node = useRef();
  useOnClickOutside(node, () => setOpen(false));
  const menuId = "main-menu";
  return (
    <CustomFlexWrapper>
      <div ref={node.current}>
        <FocusLock disabled={!open}>
          <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
          <Menu open={open} aria-controls={menuId} />
        </FocusLock>
      </div>

      <div>
        <ConnectWallet />
      </div>
    </CustomFlexWrapper>
  );
};

export default Navbar;
