import React from "react";
import styled from "styled-components";
import {Heart} from "react-feather";

const FooterWrapper = styled.div`
  margin: 40px -40px -40px;
  background: #f1f1f1;
  min-height: 40px;
  display: flex;
  justify-content: space-between;
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
  @media (max-width: 767px){
    display: none !important;
    margin: 0;
    margin-top: 40px;
   
  }
`;

export const Footer = (props) => {
    return (
        <FooterWrapper>
            <div>Made with <Heart /> by <a href="https://pascalraszyk.de">PR</a></div>
            <div>
                <a target={"_blank"} href={"https://pascalraszyk.de/de/impressum/"}>Imprint</a>
            </div>
        </FooterWrapper>
    )
};
