import React from "react";
import styled from "styled-components";

const ListItemWrapper = styled.div`
  height: 80px;
  line-height: 80px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  padding: 0 20px;
  border-bottom: 1px solid #ccc;
  text-transform: uppercase;
  font-family: 'Luckiest Guy';
  font-size: 24px;
  
  :first-child {
    border-radius: 8px 8px 0 0;
  }
  :last-child {
    border-bottom: none;
    border-radius: 0 0 8px 8px;
  }
  
  :hover {
    background: #f1f1f1;
    cursor: pointer;
  }
  
  @media (prefers-color-scheme: dark){
    border-color: #999;
    :hover {
      background: #333;
    }
  }
`;

export const ListItem = ({children}) => {
    return (
        <ListItemWrapper>
            {children}
        </ListItemWrapper>
    );
};
