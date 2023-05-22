import React, {ReactNode} from "react";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

export const Container: React.FC<ContainerProps> = ({
  className = "",
  children,
}) => {
  return (
    <section className={`${className} max-w-7xl mx-auto`}>{children}</section>
  );
};
