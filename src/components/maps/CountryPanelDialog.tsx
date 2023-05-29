import { Headline } from "@/components/ui/Headline";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "@legendapp/state/react";
import { multiPlayerState } from "@/state/multiplayer";
import { Country, RoundState } from "@prisma/client";
import { LocaleName } from "../../../types";
import { useLocale } from "next-intl";

const countryName = (country: Country, locale: LocaleName) => {
  if (locale === "de") {
    return country.translations["deu"].common;
  }

  return country.nameCommon;
};

export const CountryPanelDialog: React.FC<{ visible: boolean }> = ({
  visible,
}) => {
  const locale: LocaleName = useLocale() as LocaleName;
  const multiPlayer = useSelector(() => multiPlayerState.get());

  const [style] = useSpring(
    {
      top: visible ? 10 : -200,
      delay: 400,
    },
    [visible]
  );

  return (
    <animated.div
      style={style}
      className={
        "transform-gpu shadow-xl flex items-center rounded-xl px-4 pt-2 bg-card bg-opacity-60 backdrop-blur left-2 absolute top-2"
      }
    >
      {multiPlayer.country && (
        <>
          <div className={"text-4xl relative -top-1.5"}>
            {multiPlayer.country.flagEmoji}
          </div>
          <Headline size={"h4"}>
            {countryName(multiPlayer.country, locale)}?
          </Headline>
        </>
      )}
    </animated.div>
  );
};
