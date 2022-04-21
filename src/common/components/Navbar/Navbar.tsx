import styled from "styled-components";
import ConnectWallet from "../ConnectWallet/ConnectWallet";
import Menu from "../Menu/Menu";

const CustomFlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 20px 0 20px;
`;

const Navbar = () => {
  const menuId = "main-menu";
  return (
    <CustomFlexWrapper>
      <div>
        <Menu aria-controls={menuId} />
      </div>

      <div>
        <ConnectWallet />
      </div>
    </CustomFlexWrapper>
  );
};

export default Navbar;
