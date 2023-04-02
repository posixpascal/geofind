import React, {ReactNode, useEffect} from "react";

export const ThemeProvider : React.FC<{children: ReactNode}> = ({children}) => {
    return <>
        {children}
    </>
}