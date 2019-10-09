import React from "react";
import styled from "styled-components";

export const BreakOnMobile = styled.div`
  display: flex;
  
    @media (max-width: 767px){ 
      flex-direction: ${props => props.reverse ? "column-reverse" : "column"};
    }
`;
