import { animated, useSpring } from "@react-spring/web";
import React from "react";
import { BackButton } from "@/components/ui/BackButton";
import { Container } from "@/components/layout/Container";
import { UserProfileStatus } from "@/components/user/UserProfileStatus";
import { UsersOnlineCounter } from "@/components/user/UsersOnlineCounter";
import { useRouter } from "next/router";
import { useSelector } from "@legendapp/state/react";
import { singlePlayerState } from "@/state/singleplayer";
import { multiPlayerState } from "@/state/multiplayer";

interface NavbarProps {}

export const Navbar: React.FC<NavbarProps> = ({}) => {
  const singlePlayer = useSelector(() => singlePlayerState.get());
  const multiPlayer = useSelector(() => multiPlayerState.get());
  const hideNavbar =
    singlePlayer || (multiPlayer && multiPlayer.gameState !== "LOBBY");

  const style = useSpring({
    from: {
      translateY: `0%`,
      scale: 1,
      opacity: 1,
    },
    to: {
      translateY: hideNavbar ? `-150%` : `0%`,
      //scale: hideNavbar ? 0 : 1,
      opacity: hideNavbar ? 0 : 1,
    },
  });

  return (
    <Container className={"mx-auto z-20 w-full max-w-7xl"}>
      <animated.nav
        style={style}
        className={
          "flex py-2 mt-4 bg-background/70 backdrop-blur px-5 rounded-xl text-card-headline w-full justify-between"
        }
      >
        <div className={"flex items-center justify-between w-full gap-3"} data-cy='navigation'>
          <BackButton />
          <UserProfileStatus />
          <UsersOnlineCounter />
        </div>
      </animated.nav>
    </Container>
  );
};
