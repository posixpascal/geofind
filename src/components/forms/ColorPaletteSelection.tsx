import {
  COLOR_PALETTES,
  ColorPaletteKey,
} from "@/server/constants/colorPalette";
import { Clickable } from "@/components/utils/Clickable";
import { animated, useSpringRef, useTransition } from "@react-spring/web";
import { ColorSwatch } from "@/components/controls/ColorSwatch";
import React, { useEffect } from "react";
import { useTranslations } from "next-intl";
import { useSelector } from "@legendapp/state/react";
import { settingsState } from "@/state/settings";
import { trpc } from "@/utils/trpc";

export const ColorPaletteSelection = () => {
  const settings = useSelector(() => settingsState.get());
  const updateSetting = trpc.settings.update.useMutation({
    onMutate(result: any) {
      settingsState.set({
        ...settings,
        [result.key]: result.value,
      } as any); // todo: type
    },
  });



  const toggleSetting = (key: string, value: string | boolean) => {
    updateSetting.mutate({
      key,
      value: value,
    });
  };

  const colorSchemeAnimation = useSpringRef();
  const [colorSchemeTransition] = useTransition(
    Object.keys(COLOR_PALETTES) as ColorPaletteKey[],
    () => ({
      ref: colorSchemeAnimation,
      trail: 400 / Object.keys(COLOR_PALETTES).length,
      from: { opacity: 0, scale: 0 },
      enter: { opacity: 1, scale: 1 },
      leave: { opacity: 0, scale: 0 },
      delay: 400,
    })
  );

  useEffect(() => {
    colorSchemeAnimation.start();
  }, []);

  return (
    <div className={"grid grid-cols-3 pt-4 gap-4"}>
      {colorSchemeTransition((style, colorPaletteKey: ColorPaletteKey) => (
        <Clickable
          key={colorPaletteKey}
          onClick={() => toggleSetting("colorPalette", colorPaletteKey)}
        >
          <animated.div
            style={{
              ...style,
              background: COLOR_PALETTES[colorPaletteKey].background,
            }}
            className={`flex items-center justify-between rounded-xl p-5 relative`}
          >
            <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].button} />
            <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].tertiary} />
            <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].secondary} />
            <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].paragraph} />
            <ColorSwatch color={COLOR_PALETTES[colorPaletteKey].headline} />
            {settings?.colorPalette === colorPaletteKey && (
              <span className={"absolute -top-2 -right-2"}>✅</span>
            )}
          </animated.div>
        </Clickable>
      ))}
    </div>
  );
};
