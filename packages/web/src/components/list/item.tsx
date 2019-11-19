import React from "react";
import styled from "styled-components";
import {UserPin} from "../pins/userPin";

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
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const ListItemSuffixWrapper = styled.div`
  color: #999;
  display: flex;
  align-items: center;
  svg {
    margin-right: 10px;
  }
  ${props => props.icon && `
    align-items: flex-end;
    svg {
        margin-right: -10px;
        height: 48px;
        width: 48px;
    }
  `}
`;

export const ListItem = ({children, onClick = () => {}}) => {
    return (
        <ListItemWrapper onClick={onClick}>
            {children}
        </ListItemWrapper>
    );
};

export const ListItemSuffix = ({children, icon=false}) => {
    return (
        <ListItemSuffixWrapper icon={icon}>
            {children}
        </ListItemSuffixWrapper>
    )
};
