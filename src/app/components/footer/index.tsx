import React from "react";
import {NavLink} from "react-router-dom";

import styled from "styled-components";
import {strings} from "../../i18n";
import {UserColor} from "../userListing";
import {Heart} from "react-feather";
const FooterWrapper = styled.div`
  margin: 40px -40px -40px;
  background: #f1f1f1;
  min-height: 40px;
  padding: 15px; 
  svg {
    width: 18px;
    height: 18px;
    position: relative;
    top: 4px;
    line, polygon, path {
      fill: red;
      stroke: #ff414c;
    }
  }
`;

export const Footer = (props) => {
    return (
        <FooterWrapper>
            <div>Made with <Heart /> by <a href="https://pascalraszyk.de">PR</a></div>
            <div>
                <a href={"https://pascalraszyk.de/de/impressum/"}>Imprint</a>
            </div>
        </FooterWrapper>
    )
};
