"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Swipes = void 0;
const react_1 = __importStar(require("react"));
const use_resize_observer_1 = __importDefault(require("use-resize-observer"));
const useDebounceValue_1 = require("@/hooks/useDebounceValue");
const Swipes = ({ readOnly = false, title, children, defaultIndex = 0, onChange, }) => {
    const [currentSlide, setCurrentSlide] = (0, react_1.useState)(defaultIndex);
    const debouncedCurrentSlide = (0, useDebounceValue_1.useDebounceValue)(currentSlide, 300);
    const innerRef = (0, react_1.useRef)(null);
    const [width, setWidth] = (0, react_1.useState)(0);
    /**
     * Slide active slide back into view on resize if dimensions change
     */
    (0, use_resize_observer_1.default)({
        ref: innerRef,
        onResize() {
            const container = innerRef.current;
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
    (0, react_1.useEffect)(() => {
        onChange(debouncedCurrentSlide);
    }, [debouncedCurrentSlide]);
    // Calculates the maximum scroll width
    (0, react_1.useEffect)(() => {
        if (!innerRef.current) {
            return;
        }
        if (defaultIndex) {
            setTimeout(() => {
                // TODO: check for low end devices
                const container = innerRef.current;
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
    const scroll = (offset) => {
        const container = innerRef.current;
        const elementIndex = Math.round(container.scrollLeft / (container.scrollWidth / container.children.length));
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
        const container = innerRef.current;
        const elementIndex = Math.round(container.scrollLeft / (container.scrollWidth / container.children.length));
        setCurrentSlide(elementIndex);
    };
    const prev = () => scroll(-1);
    const next = () => scroll(1);
    const container = innerRef.current;
    const canScrollNext = !readOnly && container && currentSlide < container.children.length - 1;
    const canScrollPrev = !readOnly && container && currentSlide > 0;
    return (<div className={`my-4 p-4 rounded-xl bg-background/50 ${readOnly ? "pointer-events-none" : ""}`}>
      <div className={"flex w-full my-2 justify-between"}>
        <div className="w-6">
          {canScrollPrev && (<button onClick={prev} className={"p-3 -m-3"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5"/>
              </svg>
            </button>)}
        </div>
        <h3 className={"font-bold text-xl"}>{title}</h3>

        <div className="w-6">
          {canScrollNext && (<button onClick={next} className={"p-3 -m-3"}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5"/>
              </svg>
            </button>)}
        </div>
      </div>
      <div onScroll={onScroll} ref={innerRef} className={"w-full flex overflow-auto snap-x snap-mandatory"}>
        {children.map((child, index) => (<div className={"snap-center"} key={index} style={{ minWidth: `${width}px` }}>
            {child}
          </div>))}
      </div>
    </div>);
};
exports.Swipes = Swipes;
