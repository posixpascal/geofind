import {ReactNode} from "react";

interface HeadlineProps {
    children: ReactNode,
    size: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

export const Headline: React.FC<HeadlineProps> = ({children, size = "h2"}) => {
    if (size === "h1") {
        return <h1 className={"text-4xl dark:text-slate-200 font-black pb-3"}>
            {children}
        </h1>
    }

    if (size === "h2") {
        return <h2 className={"text-3xl dark:text-slate-200 font-black pb-3"}>
            {children}
        </h2>
    }

    return <h3 className={"text-2xl dark:text-slate-200 font-black pb-3"}>
        {children}
    </h3>
}