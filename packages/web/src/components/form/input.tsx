import * as React from "react";
import styled from "styled-components";

export const FancyInput = styled.input`
  display: block;
  border-radius: 8px;
  font-size: 32px;
  font-family: 'Luckiest Guy';
  padding: 16px 20px 8px;
  background: transparent;
  border: 2px solid #999;
  width: 100%;
  outline: none;
  @media (prefers-color-scheme: dark){
    color: #fff;
  }
`;
