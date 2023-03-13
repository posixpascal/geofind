import { useRouter } from "next/router";
import { animated, useSpring } from "@react-spring/web";
import { useRecoilState } from "recoil";
import { singlePlayerState } from "@/state/singleplayer";
import { NavbarUser } from "@/components/NavbarUser";
import React, { useMemo } from "react";
import { NavbarSinglePlayer } from "@/components/NavbarSinglePlayer";

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

  const onBack = () => {
    if (singlePlayer && singlePlayer.country) {
      return push("/");
    }

    return back();
  };

  const { y } = useSpring({
    from: { y: 0 },
    y: hasBackButton ? 1 : 0,
    config: { duration: 100 },
  });

  const navigation = useMemo(() => {
    if (singlePlayer && singlePlayer.country) {
      return <NavbarSinglePlayer back={onBack} hasBackButton={hasBackButton} />;
    }

    return <NavbarUser back={onBack} hasBackButton={hasBackButton} />;
  }, [singlePlayer, hasBackButton]);

  return (
    <animated.nav
      style={{
        transform: y
          .interpolate({ range: [0, 1], output: [20, 0] })
          .interpolate((x) => `translateY(${x}px)`),
        borderRadius: y
          .interpolate({ range: [0, 1], output: [16, 0] })
          .interpolate((x) => `${x}px ${x}px 16px 16px`),
      }}
      className={
        "flex p-2 px-5 rounded-xl backdrop-blur bg-opacity-50 z-20 bg-orange-100 w-full justify-between"
      }
    >
      {navigation}
    </animated.nav>
  );
};
