import React, {ReactNode, useEffect, useRef, useState} from "react";
import useResizeObserver from "use-resize-observer";
import {useDebounceValue} from "@/hooks/useDebounceValue";

interface SwipesProps {
  children: ReactNode[];
  title: string;
  defaultIndex: number;
  onChange: (newIndex: number) => void;
  readOnly?: boolean;
}

export const Swipes: React.FC<SwipesProps> = ({
  readOnly = false,
  title,
  children,
  defaultIndex = 0,
  onChange,
}) => {
  const [currentSlide, setCurrentSlide] = useState(defaultIndex);
  const debouncedCurrentSlide = useDebounceValue(currentSlide, 300);

  const innerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  /**
   * Slide active slide back into view on resize if dimensions change
   */
  useResizeObserver({
    ref: innerRef,
    onResize() {
      const container: HTMLDivElement = innerRef.current!;
      if (!container) {
        return;
      }

      const scrollTarget = container.children[currentSlide];

      if (!scrollTarget) {
        return;
      }

      scrollTarget.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "nearest",
      });
    },
  });

  useEffect(() => {
    onChange(debouncedCurrentSlide);
  }, [debouncedCurrentSlide]);

  // Calculates the maximum scroll width
  useEffect(() => {
    if (!innerRef.current) {
      return;
    }

    if (defaultIndex) {
      setTimeout(() => {
        // TODO: check for low end devices
        const container: HTMLDivElement = innerRef.current!;
        const scrollTarget = container.children[defaultIndex];
        scrollTarget.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "nearest",
        });
      }, 300);
    }

    setWidth(innerRef.current.offsetWidth);
  }, [width, defaultIndex, innerRef]);

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

    setCurrentSlide(elementIndex);
    scrollTarget.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  const onScroll = () => {
    const container: HTMLDivElement = innerRef.current!;
    const elementIndex = Math.round(
      container.scrollLeft / (container.scrollWidth / container.children.length)
    );
    setCurrentSlide(elementIndex);
  };

  const prev = () => scroll(-1);

  const next = () => scroll(1);

  const container = innerRef.current;
  const canScrollNext =
    !readOnly && container && currentSlide < container.children.length - 1;
  const canScrollPrev = !readOnly && container && currentSlide > 0;

  return (
    <div
      className={`my-4 p-4 rounded-xl bg-background/50 ${
        readOnly ? "pointer-events-none" : ""
      }`}
    >
      <div className={"flex w-full my-2 justify-between"}>
        <div className="w-6">
          {canScrollPrev && (
            <button onClick={prev} className={"p-3 -m-3"}>
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
          )}
        </div>
        <h3 className={"font-bold text-xl"}>{title}</h3>

        <div className="w-6">
          {canScrollNext && (
            <button onClick={next} className={"p-3 -m-3"}>
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
          )}
        </div>
      </div>
      <div
        onScroll={onScroll}
        ref={innerRef}
        className={"w-full flex overflow-auto snap-x snap-mandatory"}
      >
        {children!.map((child, index) => (
          <div
            className={"snap-center"}
            key={index}
            style={{ minWidth: `${width}px` }}
          >
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};
