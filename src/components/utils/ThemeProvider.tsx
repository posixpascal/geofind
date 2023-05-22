import React, {ReactNode} from "react";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  return <>{children}</>;
};
