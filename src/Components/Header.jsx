import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 60px;
`;
const Wrapper = styled.div`
  padding: 0px 20px;
  display: flex;
  align-item: center;
  justify-content: space-between;
  background-color: "teal";
`;
const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  cursor: pointer;
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
`;

const Navbar = () => {
  return (
    <Container>
      <Wrapper>
        <Left>
          <Logo>THAPA.</Logo>
        </Left>
        <Right>
          <MenuItem>HOME </MenuItem>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>SIGN IN</MenuItem>
          <MenuItem>ABOUT US</MenuItem>
          <MenuItem>CONTACT US</MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
