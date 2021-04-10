// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";

export const LobbyRow = styled.div`
    padding: 10px 20px;
    margin: 0 -40px;
    border-bottom: 1px solid #ddd;
    :first-child {
      border-top: 1px solid #ddd;
    }
    display: flex;
    align-items: center;
    justify-content: space-between;
    background:#AAAAAA;
    @media (max-width: 767px){
      margin: 0 !important;
    }
    div {
      display: flex;
      align-items: center;
    }
`;

export const LobbyIcon = styled.div`
  margin-right: 10px;
  svg {
    width: 16px;
    height: 16px;
  }
`;

export const LobbyName = styled.div``;

export const JoinLobbyButton = styled.button`
  margin: 0 5px;
  height: 33px;
  line-height: 33px;

`;
