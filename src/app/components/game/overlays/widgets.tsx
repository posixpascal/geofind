import React from "react";
import styled from "styled-components";

export const StreetViewOverlay = styled.div`
  position: absolute;
  left: 30px;
  max-width: 320px;
  padding: 20px;
  z-index:20;
  top:90px;
  background:#fff;
  text-align: center;
  box-shadow: 3px 3px 8px rgba(0,0,0,.3);
  svg {
  }
  h2 {
    margin: 0;
    padding: 0;
    font-size: 32px;
  }
  .mobile-only {
    display: none;
  }
  @media (max-width: 767px){
    top: 70px; !important;
    left: 0 !important;
    width: 100% !important;
    max-width: 100% !important;
    box-shadow: none !important;
    .hidden-mobile {
      display: none !important;
    }
    .mobile-only {
      display: inline-block;
    }
    hr {
      margin: 10px 0;
    }

    h1 {
    font-size: 20px;
    margin: 0;
    }
    p { margin: 0;}
  }
`;
