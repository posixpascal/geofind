import {useSettings} from "@/hooks/useSettings";
import React, {ReactNode, useEffect} from "react";

export const ThemeProvider : React.FC<{children: ReactNode}> = ({children}) => {
    const settings = useSettings()

    useEffect(() => {
        console.log("TP settings: ", settings);
        if (!("enableDarkMode" in settings)){
            return;
        }

        if (settings.enableDarkMode){
            document.querySelector('body')!.classList.add("dark");
            localStorage.darkMode = "1";
            console.info("DarkMode: 1")
        } else {
            document.querySelector('body')!.classList.remove("dark");
            localStorage.darkMode = "0";
            console.info("DarkMode: 0")
        }
    }, [settings])

    return <>
        {children}
    </>
}