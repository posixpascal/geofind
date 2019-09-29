import React from "react";
import {NavLink} from "react-router-dom";

import styled from "styled-components";
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
`;
const EmptyStateTitle = styled.h3`
  margin: 0;
  padding: 0;
`;
const EmptyStateDescription = styled.p`
  text-align: center;
  margin: 10px 0;
  font-size: 16px;
  color: #999;
`;
const EmptyStateAction = styled.div``;

export const EmptyState = (props: IEmptyStateProps) => {
    return (
        <EmptyStateWrapper>
            <EmptyStateTitle>
                {props.title}
            </EmptyStateTitle>
            <EmptyStateDescription>
                {props.description}
            </EmptyStateDescription>
            <EmptyStateAction>
                <NavLink to={props.ctaLink}>
                    <Button>{props.ctaText}</Button>
                </NavLink>
            </EmptyStateAction>
        </EmptyStateWrapper>
    )
};
