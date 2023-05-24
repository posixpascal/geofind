import { UserAvatar } from "@/components/user/UserAvatar";
import { expLevel } from "@/utils/experience";
import React, { useState } from "react";
import { settingsState } from "@/state/settings";
import { useTranslations } from "next-intl";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { useSelector } from "@legendapp/state/react";

export const UserProfileStatus = () => {
  const settings = useSelector(() => settingsState.get());

  const t = useTranslations();
  const { user } = useCurrentUser();
  const [experience, setExperience] = useState(0);

  return (
    <div className={"flex items-center gap-4"}>
      <UserAvatar width={64} height={64} />
      <div className={"flex flex-col flex-grow"}>
        <div className={"leading-6 text-md md:text-xl"}>
          Hallo,&nbsp;
          <span className={"font-bold"}>
            {user.data ? user.data.name : t("loading")}
          </span>
        </div>

        <div className={"gap-1 flex text-sm md:text-md"}>
          {settings.enableExperience && user.data && (
            <div className={"flex"}>Lvl. {expLevel(experience)}</div>
          )}
          <div className={"flex"}></div>
        </div>
      </div>
    </div>
  );
};
