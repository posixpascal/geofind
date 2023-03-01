import {animated, useSpring} from "@react-spring/web";
import React, {ReactNode, useState} from "react";

interface TileProps {
    title: ReactNode,
    content: ReactNode,
    icon: ReactNode
    tag?: ReactNode
}

export const Tile : React.FC<TileProps> = ({ title, tag, content, icon }) => {
    const [hover, setHover] = useState(false);
    const { x } = useSpring({ from: { x: 0 }, x: hover  ? 1 : 0, config: { duration: 50 } })


    return <animated.div
        style={{
            transform: x
                .interpolate({
                    range: [0, 1],
                    output: [1, 1.10]
                })
                .interpolate(x => `scale(${x})`)
        }}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="bg-white relative rounded-xl shadow-lg p-4
      cursor-pointer transition duration-300
      focus:outline-none focus:ring-2 focus:ring-orange-200 focus:ring-offset-3">
        <div className={'flex gap-2'}>
            <div className={'flex flex-col grow-1 w-full'}>
                <div className={'text-2xl font-bold'}>
                    {title}
                </div>
                <div>
                    {content}

                    {tag && <div className="-mx-0 mt-2">
                        {tag}
                    </div>}
                </div>
            </div>

            <div className={'flex justify-start'}>
                {icon}
            </div>
        </div>
    </animated.div>
}