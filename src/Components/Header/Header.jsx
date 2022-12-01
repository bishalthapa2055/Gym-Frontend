import React from "react";
import styled from "styled-components";

const HeaderDetails = styled.div`
  height: 30px;
  background-color: green;
  color: white;
  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-width: 500;
`;
const Header = () => {
  return (
    <div>
      <HeaderDetails>
        <h1>HEllo nepal</h1>
      </HeaderDetails>
    </div>
  );
};

export default Header;
