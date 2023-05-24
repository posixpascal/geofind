"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FactsIndicator = void 0;
const facts_1 = require("@/state/facts");
const router_1 = require("next/router");
const bulb_svg_1 = __importDefault(require("@/assets/svgs/icons/bulb.svg"));
const web_1 = require("@react-spring/web");
const IconButton_1 = require("@/components/controls/IconButton");
const react_1 = require("react");
const react_2 = require("@legendapp/state/react");
const FactsIndicator = () => {
    const router = (0, router_1.useRouter)();
    const facts = (0, react_2.useSelector)(() => facts_1.factsState.get());
    const [index, setIndex] = (0, react_1.useState)(0);
    const localizedFacts = facts.filter((fact) => fact.language === router.locale);
    (0, react_1.useEffect)(() => {
        setIndex(Math.floor(Math.random() * localizedFacts.length));
    }, [localizedFacts]);
    const { y } = (0, web_1.useSpring)({
        from: { y: 0 },
        y: facts.length ? 1 : 0,
        config: { duration: 300 },
    });
    const nextFact = () => {
        setIndex((index) => index + 1);
    };
    if (!localizedFacts.length) {
        return <></>;
    }
    const fact = localizedFacts[index % facts.length];
    return (<web_1.animated.div style={{
            transform: y
                .interpolate({
                range: [0, 1],
                output: [100, 0],
            })
                .interpolate((y) => `translateY(${y}px)`),
        }} className={`
            mx-auto absolute bottom-5 left-0 right-0 p-3 px-4 shadow-xl min-h-[75px] 
            bg-white dark:bg-slate-900 dark:text-slate-200 rounded-xl max-w-3xl bg-opacity-60 gap-4 backdrop-blur flex items-center`}>
      <bulb_svg_1.default />
      <div className={"flex-grow w-full"}>
        <strong>Wusstest du?</strong> {fact.description}
      </div>
      <div className={"flex-grow justify-self-end whitespace-pre"}>
        <IconButton_1.IconButton variant={"plain"} onClick={nextFact} size={"sm"}>
          {(index % facts.length) + 1} / {localizedFacts.length}
        </IconButton_1.IconButton>
      </div>
    </web_1.animated.div>);
};
exports.FactsIndicator = FactsIndicator;
