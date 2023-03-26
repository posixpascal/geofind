import { animated, useSpring } from "@react-spring/web";
import { IconButton } from "@/components/IconButton";
import BackIcon from "@/assets/svgs/icons/back.svg";
import { useTranslation } from "next-i18next";
import { useRecoilState } from "recoil";
import { singlePlayerState } from "@/state/singleplayer";
import { MouseEventHandler, useEffect, useMemo, useState } from "react";
import { trpc } from "@/utils/trpc";
import { useRouter } from "next/router";
import { markerState } from "@/state/marker";
import { RoundState } from "@prisma/client";
import { distanceBetween } from "@/utils/geo";
import { SINGLEPLAYER_ERROR_TIME } from "@/server/constants/timings";

const locale3 = (locale2: string) => {
  switch (locale2) {
    case "de":
      return "deu";
  }

  return "";
};

interface NavbarSinglePlayerProps {
  back: MouseEventHandler;
  hasBackButton: boolean;
}

export const NavbarSinglePlayer: React.FC<NavbarSinglePlayerProps> = ({
  back,
  hasBackButton,
}) => {
  const [distance, setDistance] = useState("");
  const [singlePlayer] = useRecoilState(singlePlayerState);
  const [marker] = useRecoilState(markerState);

  const timesFound = trpc.countries.timesFound.useQuery({
    id: singlePlayer.countryId!,
  });
  const vote = trpc.singleplayer.vote.useMutation();
  const skip = trpc.singleplayer.skip.useMutation();
  const prepare = trpc.singleplayer.prepare.useMutation();

  const { locale } = useRouter();
  const { t } = useTranslation("common");
  const { x } = useSpring({
    from: { x: 0 },
    x: hasBackButton ? 1 : 0,
    config: { duration: 100 },
  });

  const submitVote = () => {
    vote
      .mutateAsync({
        id: singlePlayer.id!,
        lngLat: {
          lng: marker.lng,
          lat: marker.lat,
        },
      })
      .then((result: any) => {
        if (result) {
          const [country] = result;
          const distance = distanceBetween(
            [marker.lng, marker.lat],
            [country.lng, country.lat]
          );
          setDistance(distance.toFixed(2));
        }
      });
  };

  useEffect(() => {
    if (distance) {
      let timer = setTimeout(() => {
        setDistance("");
      }, SINGLEPLAYER_ERROR_TIME);
      return () => clearTimeout(timer);
    }
  }, [distance]);

  const submitSkip = () => {
    skip
      .mutateAsync({
        id: singlePlayer.id!,
      })
      .then((result) => {
        console.log(result);
      });
  };

  const submitNext = () => {
    prepare.mutateAsync({
      id: singlePlayer.id!,
    });
  };

  return (
    <>
      <div className={"flex items-center gap-3"}>
        <animated.div
            className={"absolute z-0"}
            style={{
              opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
              transform: x
                  .interpolate({ range: [0, 1], output: [0, 70] })
                  .interpolate((x) => `translateX(-${x}%)`),
            }}
        >
          <IconButton size={"sm"} onClick={back}>
            <BackIcon className={"h-8 w-8"} />
          </IconButton>
        </animated.div>
        <div className={"text-6xl z-10"}>{singlePlayer.country!.flagEmoji}</div>
        <div className={"flex flex-col flex-grow"}>
          <div className={"leading-6 text-md md:text-xl"}>
            Wo liegt&nbsp;
            <span className={"font-bold"}>
              {singlePlayer.country?.translations[locale]?.common ??
                singlePlayer.country!.nameCommon}
            </span>
            ?
          </div>

          <div className={"gap-1 flex text-sm md:text-md"}>
            <div className={"flex"}>
              {timesFound.isStale ? `${timesFound.data} mal gefunden` : ""}
            </div>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
      {!distance && singlePlayer.roundState === RoundState.STARTED && (
        <div className={"flex gap-4 items-center"}>
          <IconButton onClick={() => submitSkip()} variant={"negative"}>
            <span className={"hidden sm:inline-block"}>Überspringen</span>
          </IconButton>
          <IconButton onClick={() => submitVote()} variant={"positive"}>
            <span className={"hidden sm:inline-block"}>
              {vote.isLoading ? "Lade..." : "Lösen"}
            </span>
          </IconButton>
        </div>
      )}

      {distance && (
        <div className={"flex gap-4 items-center"}>
          <IconButton variant={"negative"}>
            Du bist {distance}km vom Ziel entfernt!
          </IconButton>
        </div>
      )}

      {(singlePlayer.roundState === RoundState.SUCCESS ||
        singlePlayer.roundState === RoundState.ENDED) && (
        <div className={"flex gap-4 items-center"}>
          <IconButton variant={"positive"} onClick={submitNext}>
            Weiter
          </IconButton>
        </div>
      )}
    </>
  );
};
