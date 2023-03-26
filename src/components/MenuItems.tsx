import React, {
  MouseEventHandler,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { Tile } from "@/components/Tile";
import { useTranslation } from "next-i18next";
import { Tag } from "./Tag";

import GlobeIcon from "@/assets/svgs/icons/globe.svg";
import JoystickIcon from "@/assets/svgs/icons/joystick.svg";
import SwordsIcon from "@/assets/svgs/icons/swords.svg";
import AchievementsIcon from "@/assets/svgs/icons/achievements.svg";
import SettingsIcon from "@/assets/svgs/icons/settings.svg";
import LearnIcon from "@/assets/svgs/icons/learn.svg";
import ClockIcon from "@/assets/svgs/icons/clock.svg";
import EmailIcon from "@/assets/svgs/icons/email.svg";
import ParrotIcon from "@/assets/svgs/icons/parrot.svg";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { Clickable } from "./Clickable";
import { animated, Transition } from "@react-spring/web";
import Link from "next/link";
import { usePlausible } from "next-plausible";

interface MenuItem {
  icon: ReactNode;
  tag: ReactNode;
  title: string;
  content: string;
  loading?: boolean;
}

interface ClickableMenuItem extends MenuItem {
  onClick: MouseEventHandler;
}

interface LinkableMenuItem extends MenuItem {
  to: string;
}

export const MenuItems = () => {
  const { t: menu } = useTranslation("menu");
  const router = useRouter();
  const plausible = usePlausible();
  const [active, setActive] = useState(false);
  const createSinglePlayer = trpc.singleplayer.create.useMutation();
  const createMultiPlayer = trpc.multiplayer.create.useMutation();


  useEffect(() => {
    setActive(true);
  }, []);

  const handleSinglePlayerClick = async () => {
    const result = await createSinglePlayer.mutateAsync();
    plausible("Singleplayer");
    await router.push("/singleplayer/" + result.id);
  };

  const handleMultiPlayerClick = async () => {
    const result = await createMultiPlayer.mutateAsync();
    plausible("Multiplayer");
    await router.push("/multiplayer/" + result.id);
  };

  const menuItems: (LinkableMenuItem | ClickableMenuItem)[] = [
    {
      onClick: handleSinglePlayerClick,
      icon: "🎓",
      tag: <Tag variant={"green"} title={menu("tags.singleplayer")} />,
      title: menu("singleplayer.title"),
      content: menu("singleplayer.content"),
      loading: createSinglePlayer.isLoading || createSinglePlayer.isSuccess,
    },

    {
      onClick: handleMultiPlayerClick,
      icon: "🌎",
      tag: <Tag variant={"blue"} title={menu("tags.multiplayer")} />,
      title: menu("multiplayer_create.title"),
      content: menu("multiplayer_create.content"),
    },

    {
      to: "/multiplayer/join",
      icon: "🕹️",
      tag: <Tag variant={"blue"} title={menu("tags.multiplayer")} />,
      title: menu("multiplayer_join.title"),
      content: menu("multiplayer_join.content"),
    },

    {
      to: "/competitive/ladder",
      icon: "⚔️",
      tag: <Tag variant={"red"} title={menu("tags.competitive")} />,
      title: menu("competitive_ladder.title"),
      content: menu("competitive_ladder.content"),
    },

    {
      to: "/competitive/timetrial",
      icon: "⏱️",
      tag: <Tag variant={"red"} title={menu("tags.competitive")} />,
      title: menu("competitive_timetrial.title"),
      content: menu("competitive_timetrial.content"),
    },

    {
      to: "/profile/achievements",
      icon: "🏅",
      tag: <Tag variant={"orange"} title={menu("tags.profile")} />,
      title: menu("achievements.title"),
      content: menu("achievements.content"),
    },

    // {
    //   to: "/profile/pins",
    //   icon: <PinIcon className={"w-[80px] h-[80px]"} />,
    //   tag: <Tag variant={"orange"} title={menu("tags.profile")} />,
    //   title: menu("pins.title"),
    //   content: menu("pins.content"),
    // },

    {
      to: "/profile/",
      icon: "🦜",
      tag: <Tag variant={"orange"} title={menu("tags.profile")} />,
      title: menu("profile.title"),
      content: menu("profile.content"),
    },

    {
      to: "/profile/settings",
      icon: "🔨",
      tag: <Tag variant={"orange"} title={menu("tags.profile")} />,
      title: menu("settings.title"),
      content: menu("settings.content"),
    },

    {
      to: "/feedback",
      icon: "✉️",
      tag: <Tag variant={"gray"} title={menu("tags.other")} />,
      title: menu("feedback.title"),
      content: menu("feedback.content"),
    },
    // {
    //   to: "/school",
    //   icon: "👩‍🏫️",
    //   tag: <Tag variant={"purple"} title={menu("tags.school")} />,
    //   title: menu("school.title"),
    //   content: menu("school.content"),
    // },
  ];

  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8"
      }
      style={{ minHeight: `${menuItems.length * 40}px` }}
    >
      <Transition
        items={active ? menuItems : []}
        trail={500 / menuItems.length}
        from={{ opacity: 0, scale: 0 }}
        enter={{ opacity: 1, scale: 1 }}
        leave={{ opacity: 0, scale: 0 }}
        config={{
          mass: 2,
        }}
      >
        {(styles, menuItem) => (
          <animated.div style={styles} key={menuItem.title}>
            {"onClick" in menuItem && (
              <Clickable key={menuItem.title} onClick={menuItem.onClick}>
                <Tile {...menuItem} />
              </Clickable>
            )}
            {!("onClick" in menuItem) && (
              <Link href={menuItem.to} key={menuItem.to}>
                <Tile key={menuItem.to} {...menuItem} />
              </Link>
            )}
          </animated.div>
        )}
      </Transition>
    </div>
  );
};
