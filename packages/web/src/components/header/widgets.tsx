// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  position: sticky;
  top: 0;
  z-index: 110;
  height: 60px;
  align-items: center;
  transition: background 0.3s linear, color 0.3s linear;
 
    @media (prefers-color-scheme: dark) {
      background:  #222; color: white;
      a {
        color: white !important;
      }
    }
`;

export const BrandTitle = styled.h1`
  margin: 0;
  font-size: 42px;
  position:relative;
  display: flex;
  align-items: center;
  a { color: #333; text-decoration: none;padding-left: 20px; position: relative; top: 10px;}
  font-family: 'Luckiest Guy', cursive;
`;

export const NavItem = styled.li`
  @media (max-width: 767px){
    display: none !important;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  ul {
    display: flex;
    justify-content: space-evenly;
    list-style: none;
    align-content: flex-start;
    margin: 0;
    li {
      display: inline-block;
      margin: 0;
    }
  }
`;

export const Divider = styled.li`
`;

export const CurrentUser = styled.div`
  position: relative;
  text-align: right;
  font-weight: 700;
  display: flex;
  align-items: center;
  padding: 10px;
  span {
    font-size: 24px;
    display: block;
    position: relative;
    top: 10px;
    font-family: 'Luckiest Guy', cursive;
  }
  
  svg {
    animation: spin 0.8s linear infinite;
    position: absolute;
    left: 0;
    top: 2px;
  }
  
  img {
      width: 64px;
  }
`;

export const Image = styled.img`
  display: inline;
  height: 32px;
`;
