import {Head, Html, Main, NextScript} from "next/document";
import {useSettings} from "@/hooks/useSettings";
import {useLocalStorage, useMedia} from "react-use";

export default function Document() {
    return (
        <Html lang="en">
            <Head/>
            <body>
            <Main/>
            <NextScript/>
            </body>
        </Html>
    );
}
