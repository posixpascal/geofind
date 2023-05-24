import { animated, useSpringRef, useTransition } from "@react-spring/web";
import { SettingsToggle } from "@/components/forms/SettingsToggle";
import React, { useEffect, useMemo } from "react";
import { useSelector } from "@legendapp/state/react";
import { settingsState } from "@/state/settings";
import { trpc } from "@/utils/trpc";
import { SettingsKey } from "@/server/constants/settings";
import { useTranslations } from "next-intl";

export const AppSettingsSelection = () => {
  const t = useTranslations("settings");

  const settings = useSelector(() => settingsState.get());
  const userSettings = trpc.settings.list.useQuery();
  const updateSetting = trpc.settings.update.useMutation({
    onMutate(result: any) {
      settingsState.set({
        ...settings,
        [result.key]: result.value,
      } as any); // todo: type
    },
  });

  const allSettings: {
    key: SettingsKey;
    emoji: string;
    title: string;
    description: string;
  }[] = useMemo(
    () => [
      {
        key: "enableAnimations",
        emoji: t("animations.emoji"),
        title: t("animations.title"),
        description: t("animations.description"),
      },
      {
        key: "enableLowPowerMode",
        emoji: t("lowpower.emoji"),
        title: t("lowpower.title"),
        description: t("lowpower.description"),
      },
      {
        key: "enableFriends",
        emoji: t("friends.emoji"),
        title: t("friends.title"),
        description: t("friends.description"),
      },
      {
        key: "enableExperience",
        emoji: t("experience.emoji"),
        title: t("experience.title"),
        description: t("experience.description"),
      },
      {
        key: "enableAds",
        emoji: t("ads.emoji"),
        title: t("ads.title"),
        description: t("ads.description"),
      },
    ],
    []
  );

  useEffect(() => {
    settingsState.set({
      ...userSettings.data,
    });
  }, [userSettings.data]);

  const toggleSetting = (key: string, value: string | boolean) => {
    updateSetting.mutate({
      key,
      value: value,
    });
  };

  const animation = useSpringRef();
  const [transition, api] = useTransition(
    allSettings.length ? allSettings : [],
    () => ({
      ref: animation,
      trail: 400 / allSettings.length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
    })
  );

  useEffect(() => {
    animation.start();
  }, [allSettings]);

  return (
    <div
      className={
        "flex flex-col py-4 gap-4 will-change-transform theme-transition "
      }
    >
      {transition((style, setting) => (
        // TODO: turn into component -> Checkbox
        <animated.div style={{ ...style }} key={setting.key}>
          <SettingsToggle
            readOnly={false}
            key={setting.key}
            title={setting.title}
            icon={setting.emoji}
            description={setting.description}
            checked={!!settings[setting.key]}
            onChange={(e) => toggleSetting(setting.key, !settings[setting.key])}
          />
        </animated.div>
      ))}
    </div>
  );
};
