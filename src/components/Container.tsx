import {ReactNode} from "react";

export const Container : React.FC<{children: ReactNode}> = ({children}) => {
    return <section>
        {children}
    </section>
}