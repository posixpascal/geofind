import { MenuItems } from "@/components/MenuItems";
import { LocaleName } from "../../../types";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import DefaultPin from "@/assets/svgs/pins/default.svg";
import { useMemo } from "react";
import { TAILWIND_TEXT_COLORS } from "@/server/constants/colorPalette";
export default function ProfilePinPage() {
  const pinList = useMemo(() => {
    const pins = [
      {
        group: "standard",
        component: <DefaultPin />,
      },
    ];

    return pins.map(({ group, component }) => {
      return (
        <div key={group} className={"grid grid-cols-4"}>
          {TAILWIND_TEXT_COLORS.map((color) => (
            <>
              <div key={color} className={color}>
                {component}
              </div>
            </>
          ))}
        </div>
      );
    });
  }, []);
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8"
      }
    >
      {pinList}
    </div>
  );
}

export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "menu"])),
    },
  };
};
