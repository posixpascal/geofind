import React from "react";
import {connect} from "react-redux";
import {NavLink, withRouter} from "react-router-dom";
import styled from "styled-components";
import * as actions from "../../actions/rooms";
import {strings} from "../../i18n";
import {Button} from "../uiWidgets/Button";
interface IEmptyStateProps {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
}

const EmptyStateWrapper = styled.div`
  padding: 20px 60px;
  border: 2px dashed #f1f1f1;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  max-width: 650px;
  margin: 0 auto;
    @media (max-width: 767px){ padding: 10px 20px; }
`;
const EmptyStateTitle = styled.h3`
  margin: 0;
  padding: 0;
    @media (max-width: 767px){ {
    font-size: 18px;
    text-align: center;
    }
`;
const EmptyStateDescription = styled.p`
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
  color: #999;
`;
const EmptyStateAction = styled.div``;

export default (props: any) => {
    return (
        <EmptyStateWrapper>
            <EmptyStateTitle>
                {props.title}
            </EmptyStateTitle>
            <EmptyStateDescription>
                {props.description}
            </EmptyStateDescription>
            <EmptyStateAction onClick={props.action}>
                 <Button>{props.ctaText}</Button>
            </EmptyStateAction>
        </EmptyStateWrapper>
    );
};
