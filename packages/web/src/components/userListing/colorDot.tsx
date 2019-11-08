import * as React from "react";
import styled from "styled-components";

export const ColorDot = styled.div`
  width: 32px;
  height: 32px;
  background: ${props => props.color};
  border-radius: 50%;
`;
