import React, {ReactNode, useEffect, useRef, useState} from "react";

interface SwipesProps {
    children: ReactNode[],
    title: string;
}


export const Swipes: React.FC<SwipesProps> = ({title, children}) => {
    const innerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!innerRef.current){
            return;
        }

        setWidth(innerRef.current.offsetWidth);
    }, [innerRef]);

    const scroll = (offset: -1 | 1) => {
        const container : HTMLDivElement = innerRef.current!;
        const elementIndex = Math.round(container.scrollLeft / (container.scrollWidth / container.children.length));
        const scrollTarget = container.children[elementIndex + offset];

        if (!scrollTarget){
            return;
        }

        scrollTarget.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest'
        });
    }

    const prev = () => scroll(-1)

    const next = () => scroll(1)

    return <div className={'my-4 p-4 rounded-xl bg-background/50 shadow-lg'}>
        <div className={'flex w-full my-2 justify-between'}>
            <button onClick={prev} className={'p-3 -m-3'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
            </button>
            <h3 className={'font-bold text-xl'}>{title}</h3>
            <button onClick={next} className={'p-3 -m-3'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
            </button>
        </div>
        <div ref={innerRef} className={'w-full flex overflow-auto snap-x snap-mandatory'}>
            {children!.map((child, index) => (
                <div className={'snap-center'} key={index} style={{minWidth: `${width}px`}}>
                    {child}
                </div>
            ))}
        </div>
    </div>
}