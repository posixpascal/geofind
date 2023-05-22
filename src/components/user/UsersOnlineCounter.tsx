import {trpc} from "@/utils/trpc";
import {useState} from "react";
import {useTranslations} from "next-intl";

export const UsersOnlineCounter = () => {
  const t = useTranslations("common");
  const [count, setCount] = useState(0);
  trpc.session.onlineCount.useSubscription(undefined, {
    onData({ count }) {
      setCount(count);
    },
  });
  return (
    <div>
      <h2 className={"text-2xl font-black"}>
        {count} {t("playersOnline")}
      </h2>
    </div>
  );
};
