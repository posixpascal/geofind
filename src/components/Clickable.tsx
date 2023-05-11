import React, { MouseEventHandler, ReactNode } from "react";

interface ClickableProps {
  onClick: MouseEventHandler;
  children: ReactNode;
}

export const Clickable: React.FC<ClickableProps> = ({ onClick, children }) => {
  return <button onClick={onClick}>{children}</button>;
};
