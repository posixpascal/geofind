// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";

export const HeaderContainer = styled.header`
  display: flex;
  background: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 5px solid #f1f1f1;
  position: sticky;
  top: 0;
  z-index: 110;
`;

export const BrandTitle = styled.h1`
  margin: 0;
  padding: 0;
  font-size: 32px;
  display: flex;
  align-items: center;
  padding-left: 40px
  a {
  display: block;
  }
  img {
    height: 48px;
    position: absolute;
    top: 10px;
    left: 10px;
  }
  @media (max-width: 767px){
    font-size: 20px;
    img {
      height: 22px;
    }
  }
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
    margin: 0;
    li {
      display: inline-block;
      padding: 20px;
      margin: 0;
      @media (max-width: 767px){
        padding: 10px;
      }
    }
  }
`;

export const Divider = styled.li`
  border-right: 1px solid #ddd;
`;

export const CurrentUser = styled.div`
  padding-left: 60px;
  position: relative;
  text-align: right;
  font-weight: 700;
  font-size: 18px;
  img {
    position: absolute;
    width: 40px;
    left: 0;
    top: -12px;
  }
  svg {
    animation: spin 0.8s linear infinite;
    position: absolute;
    left: 0;
    top: 2px;
  }

  @media (max-width: 767px){
    padding-left: 40px;
    img {
      width: 30px;
      top: -6px;
    }
  }
`;

export const Image = styled.img`
  display: inline;
  height: 32px;
`;
