// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React from "react";
import styled from "styled-components";

export const RoomSettingsWrapper = styled.div`
   display: flex;
    font-size: 18px;
    align-items: center;
    justify-content: space-between;
    @media (max-width: 767px){
      font-size: 12px !important;
      align-items: flex-start;
      flex-wrap: wrap;
      flex-direction: row !important;
    }
`;

export const RoomSetting = styled.div`
  padding: 0 30px;
  display: flex;

  flex-direction: column;
  align-items: center;
  justify-content: center;
  svg {
    display: block;
  }

  @media (max-width: 767px){
    font-size: 18px !important;
    padding: 0 20px;
    width: 100%;
    flex: 0 50%;
    margin-bottom: 30px;
    svg {
    width: 20px;
    height: 20px;
    }
   }
`;

export const RoomSettingsPaneWrapper = styled.div`
  background: #fafafa;
  padding: 0 20px;
  margin-bottom: 20px;
  transition: height ease-in-out 0.3s;
   overflow: hidden;
   text-align: center;
   div {
   padding-top: 15px;
   width: 100%;
   }

  ${(props) => !props.collapsed ? `height: 0px;` : "height: 240px"}

  @media (max-width: 767px){
      div {
      padding-top: 5px !important;
      }
       .ha {
          flex-direction: column !important;
       }

       ${(props) => !props.collapsed ? `height: 0px;` : "height: 640px"}
   }
`;
export const VictoryScoreInput = styled.input`
font-size: 42px;
text-align: center;
width: 80px;
`;
export const RoundTimeInput = styled.input`
font-size: 42px;
text-align: center;
width: 80px;
`;
export const MaxRoundsInput = styled.input`
font-size: 42px;
text-align: center;
width: 80px;
`;
export const SelectInput = styled.select`
    font-size: 30px;
    text-align: center;
    width: 100%;
    border-radius: 0;
    background: #fff;
    height: 56px;
`;
export const PasswordInput = styled.input`
font-size: 42px;
text-align: center;
width: 200px;
`;

export const RoomSettingsHeader = styled.h4`
  margin-top: 10px;
`;
