import { useRouter } from "next/router";
import { animated, useSpring } from "@react-spring/web";
import { useRecoilState } from "recoil";
import { singlePlayerState } from "@/state/singleplayer";
import { NavbarUser } from "@/components/NavbarUser";
import React, {useCallback, useMemo, useState} from "react";
import { NavbarSinglePlayer } from "@/components/NavbarSinglePlayer";
import {IconButton} from "@/components/IconButton";
import BackIcon from "@/assets/svgs/icons/back.svg";
import {UserAvatar} from "@/components/UserAvatar";
import {expLevel} from "@/utils/experience";
import {signIn, signOut} from "next-auth/react";
import {useTranslation} from "next-i18next";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {trpc} from "@/utils/trpc";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const [singlePlayer] = useRecoilState(singlePlayerState);
  const { route, back, push } = useRouter();

  const hasBackButton =
    route.includes("/multiplayer") ||
    route.includes("/singleplayer") ||
    route.includes("/profile") ||
    route.includes("/feedback") ||
    route.includes("/competitive");

  const onBack = useCallback(() => {
    if (singlePlayer && singlePlayer.country) {
      return push("/");
    }

    return back();
  }, [singlePlayer, back, push]);

  const { t } = useTranslation("common");
  const { user } = useCurrentUser();
  const { x } = useSpring({
    from: { x: 0 },
    x: hasBackButton ? 1 : 0,
  });
  const [experience, setExperience] = useState(0);
  trpc.session.experience.useSubscription(void 0, {
    onData(exp: number) {
      setExperience(exp.total);
    },
  });


  return (
    <animated.nav
      // style={{
      //   transform: y
      //     .interpolate({ range: [0, 1], output: [20, 0] })
      //     .interpolate((x) => `translateY(${x}px)`),
      // }}
      className={
        "flex p-2 px-5 rounded-xl backdrop-blur bg-opacity-50 z-20 bg-orange-100 dark:bg-slate-900 dark:text-slate-300 w-full justify-between"
      }
    >
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
        <UserAvatar width={64} height={64} />
        <div className={"flex flex-col flex-grow"}>
          <div className={"leading-6 text-md md:text-xl"}>
            Hallo,&nbsp;
            <span className={"font-bold"}>
              {user.data ? user.data.name : t("loading")}
            </span>
          </div>

          <div className={"gap-1 flex text-sm md:text-md"}>
            {user.data && (
                <div className={"flex"}>Lvl. {expLevel(experience)}</div>
            )}
            <div className={"flex"}></div>
          </div>
        </div>
      </div>
      <div className={"flex gap-4 items-center"}>
        {user.data && user.data.isLoggedIn ? (
            <IconButton onClick={() => signOut()} variant={"primary"}>
              <span className={"hidden sm:inline-block"}>Logout</span>
            </IconButton>
        ) : (
            <IconButton onClick={() => signIn("discord")} variant={"primary"}>
              <span className={"hidden sm:inline-block"}>Login mit Discord</span>
            </IconButton>
        )}
      </div>
    </animated.nav>
  );
};
