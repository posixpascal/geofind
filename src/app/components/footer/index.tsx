import React from "react";
import {Heart} from "react-feather";
import styled from "styled-components";

const FooterWrapper = styled.div`
  margin: 40px -40px -40px;
  background: #663385;
  color:#fff;
  a {
  color: #fff;
  }
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
    );
};
