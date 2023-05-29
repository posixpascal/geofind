import React, {ReactNode, useEffect, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import classNames from "classnames";
import {useIntersection} from "react-use";

interface SwipesProps {
    children: ReactNode[];
    title: string;
    defaultSlide: number;
    onChange: (newIndex: number) => void;
    readOnly?: boolean;
}

const NextButton = ({onClick}) => (
    <button data-cy="next" onClick={onClick} className={"p-3 -m-3"}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
        </svg>
    </button>
);

const PrevButton = ({onClick}) => (
    <button data-cy="prev" onClick={onClick} className={"p-3 -m-3"}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
            />
        </svg>
    </button>
);

export const Swipes: React.FC<SwipesProps> = ({
                                                  readOnly = false,
                                                  title,
                                                  children,
                                                  defaultSlide = 0,
                                                  onChange,
                                              }) => {
    const [currentSlide, setCurrentSlide] = useState(defaultSlide);
    const innerRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0);
    const [isActive, setIsActive] = useState(false);

    /**
     * Slide active slide back into view on resize if dimensions change
     */
    useResizeObserver({
        ref: innerRef,
        onResize() {
            const container: HTMLDivElement = innerRef.current!;
            if (!container || !isActive) {
                return;
            }

            container.scrollBy({left: (innerRef.current.scrollWidth / children.length) * currentSlide});
        },
    });

    // Calculates the maximum scroll width
    useEffect(() => {
        if (!innerRef.current) {
            return;
        }

        setWidth(innerRef.current.offsetWidth);
    }, [innerRef]);

    useEffect(() => {
        if (!innerRef.current) {
            return;
        }

        if (isActive && !readOnly) {
            return
        }

        const container: HTMLDivElement = innerRef.current!;
        setTimeout(() => {
            container.scrollLeft = ((container.scrollWidth / children.length) * currentSlide);
            setTimeout(() => setIsActive(true), 300);
        }, 200)
    }, [readOnly, innerRef, currentSlide])

    // Scroll to next/previous element
    const scroll = (offset: -1 | 1) => {
        const container: HTMLDivElement = innerRef.current!;
        const elementIndex = Math.round(
            container.scrollLeft / (container.scrollWidth / container.children.length)
        );
        const scrollTarget = container.children[elementIndex + offset];

        if (!scrollTarget) {
            return;
        }

        scrollTarget.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
            inline: "nearest",
        });
    };

    const prev = () => scroll(-1);

    const next = () => scroll(1);

    const container = innerRef.current;
    const canScrollNext =
        !readOnly && container && (currentSlide < container.children.length - 1);
    const canScrollPrev = !readOnly && container && (currentSlide > 0);

    const header = (<div className={"flex w-full my-2 justify-between"}>
        <div className="w-6">
            {canScrollPrev && <PrevButton onClick={prev}/>}
        </div>

        <h3 className={"font-bold text-xl"}>{title}</h3>
        <div className="w-6">
            {canScrollNext && <NextButton onClick={next}/>}
        </div>
    </div>)

    return (
        <div
            className={classNames('my-4 p-4 rounded-xl bg-background/50', {
                "pointer-events-none": readOnly
            })}
        >
            {header}

            <div
                ref={innerRef}
                className={"w-full flex overflow-auto snap-x snap-mandatory"}
            >
                {children!.map((child, index) => (
                    <Slide
                        isReady={isActive}
                        onBecomeActive={() => setTimeout(() => {
                            onChange(index);
                            setCurrentSlide(index);
                        }, 300) }
                        container={innerRef}
                        className={"snap-center"}
                        key={index}
                        style={{minWidth: `${width}px`}}
                    >
                        {child}
                    </Slide>
                ))}
            </div>
        </div>
    );
};

export const Slide = ({container, isReady, onBecomeActive, ...props}) => {
    const slideWrapper = useRef();
    const observer = useIntersection(slideWrapper, {
        root: container.current,
        threshold: 0.95,
    });

    useEffect(() => {
        if (isReady && observer && observer.isIntersecting) {
            onBecomeActive()
        }
    }, [isReady, observer]);

    return <div {...props} ref={slideWrapper}>
        {props.children}
    </div>
}