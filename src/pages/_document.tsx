import {Head, Html, Main, NextScript} from "next/document";
import {useSettings} from "@/hooks/useSettings";
import {useLocalStorage, useMedia} from "react-use";

export default function Document() {
    const [darkMode] = useLocalStorage('darkMode')
    return (
        <Html lang="en">
            <Head/>
            <body className={darkMode ? 'dark' : ''}>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
