import React, { MouseEventHandler, ReactNode, useEffect } from "react";
import { Tile } from "@/components/ui/Tile";
import { Tag } from "../utils/Tag";
import { useRouter } from "next/router";
import { trpc } from "@/utils/trpc";
import { Clickable } from "../utils/Clickable";
import { animated, useSpringRef, useTransition } from "@react-spring/web";
import Link from "next/link";
import { usePlausible } from "next-plausible";
import { useTranslations } from "next-intl";

interface MenuItem {
  icon: string;
  tag: ReactNode;
  title: string;
  content: string;
  loading?: boolean;
  cypressTestId?: string;
}

interface ClickableMenuItem extends MenuItem {
  onClick: MouseEventHandler;
}

interface LinkableMenuItem extends MenuItem {
  to: string;
}

export const MenuItems = () => {
  const t = useTranslations("menu");
  const router = useRouter();
  const plausible = usePlausible();
  const createSinglePlayer = trpc.singleplayer.create.useMutation();
  const createMultiPlayer = trpc.multiplayer.create.useMutation();

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
      tag: <Tag variant={"green"} title={t("tags.singleplayer")} />,
      title: t("singleplayer.title"),
      content: t("singleplayer.content"),
      cypressTestId: "singleplayer"
    },

    {
      onClick: handleMultiPlayerClick,
      icon: "🌎",
      tag: <Tag variant={"blue"} title={t("tags.multiplayer")} />,
      title: t("multiplayer_create.title"),
      content: t("multiplayer_create.content"),
      cypressTestId: "multiplayer"
    },

    {
      to: "/multiplayer/join",
      icon: "🕹️",
      tag: <Tag variant={"blue"} title={t("tags.multiplayer")} />,
      title: t("multiplayer_join.title"),
      content: t("multiplayer_join.content"),
      cypressTestId: "multiplayer-join"
    },

    // {
    //   to: "/competitive/ladder",
    //   icon: "⚔️",
    //   tag: <Tag variant={"red"} title={t("tags.competitive")} />,
    //   title: t("competitive_ladder.title"),
    //   content: t("competitive_ladder.content"),
    // },
    //
    // {
    //   to: "/competitive/timetrial",
    //   icon: "⏱️",
    //   tag: <Tag variant={"red"} title={t("tags.competitive")} />,
    //   title: t("competitive_timetrial.title"),
    //   content: t("competitive_timetrial.content"),
    // },

    {
      to: "/profile/achievements",
      icon: "🏅",
      tag: <Tag variant={"orange"} title={t("tags.profile")} />,
      title: t("achievements.title"),
      content: t("achievements.content"),
      cypressTestId: "achievements"
    },

    // {
    //   to: "/profile/pins",
    //   icon: <PinIcon className={"w-[80px] h-[80px]"} />,
    //   tag: <Tag variant={"orange"} title={t("tags.profile")} />,
    //   title: t("pins.title"),
    //   content: t("pins.content"),
    // },

    {
      to: "/profile/",
      icon: "🦜",
      tag: <Tag variant={"orange"} title={t("tags.profile")} />,
      title: t("profile.title"),
      content: t("profile.content"),
      cypressTestId: "profile"
    },

    {
      to: "/profile/settings",
      icon: "🔨",
      tag: <Tag variant={"orange"} title={t("tags.profile")} />,
      title: t("settings.title"),
      content: t("settings.content"),
      cypressTestId: "settings"
    },

    // {
    //   to: "/feedback",
    //   icon: "✉️",
    //   tag: <Tag variant={"gray"} title={t("tags.other")} />,
    //   title: t("feedback.title"),
    //   content: t("feedback.content"),
    //   cypressTestId: "feedback"
    // },
    // {
    //   to: "/school",
    //   icon: "👩‍🏫️",
    //   tag: <Tag variant={"purple"} title={t("tags.school")} />,
    //   title: t("school.title"),
    //   content: t("school.content"),
    //   cypressTestId: "school"
    // },
  ];

  const animation = useSpringRef();
  const [transition, api] = useTransition(
    menuItems,
    () => ({
      ref: animation,
      trail: 500 / menuItems.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
      config: {
        mass: 1.5,
      },
    }),
    []
  );

  useEffect(() => {
    api.start();
  }, [menuItems]);

  return transition((styles, menuItem) => (
    <animated.div style={styles} data-cy={menuItem.cypressTestId} key={menuItem.title}>
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
  ));
};
