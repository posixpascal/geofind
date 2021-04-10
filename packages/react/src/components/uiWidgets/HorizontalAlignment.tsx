// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";

export const HorizontalAlignment = styled.div`
  display: flex;
  align-items: center;
  ${props => props.between && "justify-content: space-between;"}
`;
