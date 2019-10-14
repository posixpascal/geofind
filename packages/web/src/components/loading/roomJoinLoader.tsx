import React from "react";
import styled from "styled-components";

const RoomJoinLoaderWrapper = styled.div`
  padding: 80px;
  text-align: center;
  svg {
  width: 120px;
  height: 120px;
  }
`;

export const SvgSpinner = (
    <svg
        width="40px"
        height="40px"
        viewBox="0 0 50 50"
    >
        <path
            fill="#9b4dca"
            d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
            <animateTransform
                attributeType="xml"
                attributeName="transform"
                type="rotate"
                from="0 25 25"
                to="360 25 25"
                dur="0.6s"
                repeatCount="indefinite"
            />
        </path>
    </svg>
);

export const RoomJoinLoader = (props) => {
    return (
        <RoomJoinLoaderWrapper>
            {SvgSpinner}
            <h2>
                Loading...
            </h2>
        </RoomJoinLoaderWrapper>
    );
};
