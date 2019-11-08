import React from "react";
import styled from "styled-components";
import {Button} from "../buttons";


interface IEmptyStateProps {
    title: string;
    description: string;
    ctaText: string;
    ctaLink: string;
    action: () => void;
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

export default ({title, description, action, ctaText}: IEmptyStateProps) => {
    return (
        <EmptyStateWrapper>
            <EmptyStateTitle>
                {title}
            </EmptyStateTitle>
            <EmptyStateDescription>
                {description}
            </EmptyStateDescription>
            <EmptyStateAction onClick={action}>
                <Button variant={"purple"} title={ctaText} />
            </EmptyStateAction>
        </EmptyStateWrapper>
    );
};
