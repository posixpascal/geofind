import React from "react";
import styled from "styled-components";

const ListWrapper = styled.div`
  margin: 40px;
  border-radius: 8px;
  border: 1px solid #ccc;
  
  @media (prefers-color-scheme: dark){
    border-color: #999;
  }
`;

export const List = ({children}) => {
    return (
        <ListWrapper>
            {children}
        </ListWrapper>
    );
};
