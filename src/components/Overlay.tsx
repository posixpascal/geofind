import {animated, useSpring} from "@react-spring/web";
import {ReactNode} from "react";

interface OverlayProps {
    visible?: boolean;
    children: ReactNode
}

export const Overlay: React.FC<OverlayProps> = ({visible, children}) => {
    const style = useSpring({
        from: {
            opacity: 0
        },
        to: {
            opacity: visible ? 1 : 0
        }
    });

    return <>
        <animated.div style={style} className={'fixed inset-0 pointer-events-none bg-black/80 backdrop-blur-lg z-0'}></animated.div>
        <div className={'z-10'}>
            {children}
        </div>
    </>
}