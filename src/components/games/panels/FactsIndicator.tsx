import {factsState} from "@/state/facts";
import {useRouter} from "next/router";
import Bulb from "@/assets/svgs/icons/bulb.svg";
import {animated, useSpring} from "@react-spring/web";
import {IconButton} from "@/components/controls/IconButton";
import {useEffect, useState} from "react";
import {useSelector} from "@legendapp/state/react";

export const FactsIndicator = () => {
  const router = useRouter();
  const facts = useSelector(() => factsState.get())
  const [index, setIndex] = useState(0);

  const localizedFacts = facts.filter(
    (fact) => fact.language === router.locale
  );

  useEffect(() => {
    setIndex(Math.floor(Math.random() * localizedFacts.length));
  }, [localizedFacts]);

  const { y } = useSpring({
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
  return (
    <animated.div
      style={{
        transform: y
          .interpolate({
            range: [0, 1],
            output: [100, 0],
          })
          .interpolate((y) => `translateY(${y}px)`),
      }}
      className={`
            mx-auto absolute bottom-5 left-0 right-0 p-3 px-4 shadow-xl min-h-[75px] 
            bg-white dark:bg-slate-900 dark:text-slate-200 rounded-xl max-w-3xl bg-opacity-60 gap-4 backdrop-blur flex items-center`}
    >
      <Bulb />
      <div className={"flex-grow w-full"}>
        <strong>Wusstest du?</strong> {fact.description}
      </div>
      <div className={"flex-grow justify-self-end whitespace-pre"}>
        <IconButton variant={"plain"} onClick={nextFact} size={"sm"}>
          {(index % facts.length) + 1} / {localizedFacts.length}
        </IconButton>
      </div>
    </animated.div>
  );
};
