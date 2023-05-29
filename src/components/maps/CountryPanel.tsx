import { Headline } from "@/components/ui/Headline";
import { LoadingSpinner } from "@/components/utils/LoadingSpinner";
import { animated, useSpring } from "@react-spring/web";
import { useSelector } from "@legendapp/state/react";
import { multiPlayerState } from "@/state/multiplayer";
import { Country, RoundState } from "@prisma/client";
import { LocaleName } from "../../../types";
import { useLocale } from "next-intl";

export const countryName = (country: Country, locale: LocaleName) => {
  if (locale === "de") {
    return country.translations["deu"].common;
  }

  return country.nameCommon;
};

export const CountryPanel: React.FC<{ visible: boolean }> = ({
  visible,
}) => {
  const locale: LocaleName = useLocale() as LocaleName;
  const multiPlayer = useSelector(() => multiPlayerState.get());

  const [style] = useSpring(
    {
      top: visible ? 10 : -200,
    },
    [visible]
  );

  return (
    <animated.div
      style={style}
      className={
        "transform-gpu shadow-xl text-center m-5 rounded-xl p-4 -translate-x-2/4 bg-card bg-opacity-60 backdrop-blur left-[50%] absolute max-w-xl w-full top-0"
      }
    >
      {multiPlayer.country && (
        <>
          <p className={"text-xl"}>Findet</p>
          <div className={"text-7xl"}>{multiPlayer.country.flagEmoji}</div>
          <Headline size={"h2"}>
            {countryName(multiPlayer.country, locale)}
          </Headline>
        </>
      )}

      {!multiPlayer.country && (
        <LoadingSpinner isLoading={true} inline={true} />
      )}
    </animated.div>
  );
};
