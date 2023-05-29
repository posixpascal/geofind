import { IconButton } from "@/components/ui/IconButton";
import { trpc } from "@/utils/trpc";
import { useState } from "react";
import { FriendFollow } from "@/components/user-followers/FriendFollow";
import { Dialog } from "../ui/Dialog";
import { useTranslations } from "next-intl";
import { animated, useTransition } from "@react-spring/web";
import { UserAvatar } from "@/components/user/UserAvatar";

export const FriendList = () => {
  const t = useTranslations("friends");
  const [dialog, showDialog] = useState(false);
  const friendList = trpc.friends.list.useQuery();

  const transition = useTransition(friendList.data ? friendList.data : [], {
    trail: 1400 / (friendList.data?.length ? friendList.data!.length : 1),
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const onFollow = () => {
    showDialog(false);
    friendList.refetch();
    return {};
  };

  if (friendList.isLoading) {
    return <></>;
  }

  return (
    <div>
      <h3 className={"font-black text-card-headline text-xl"}>{t("title")}</h3>
      {friendList.data!.length === 0 && (
        <p className={"text-card-paragraph"}>{t("noFriends")}</p>
      )}

      {transition((style, { following }: any) => {
        return (
          <animated.div style={style}>
            <div
              className={
                "flex will-change-transform text-card-paragraph my-5 items-center gap-2 justify-between"
              }
            >
              <div className={"flex items-center gap-2"}>
                <UserAvatar width={32} height={32} user={following} />
                {following.name}
              </div>
              {following.experience} Exp
            </div>
          </animated.div>
        );
      })}
      <Dialog open={dialog} setOpen={() => showDialog(false)}>
        <FriendFollow onFollow={onFollow} />
      </Dialog>
      <div className={"mt-8"}>
        <IconButton size={"sm"} full={true} onClick={() => showDialog(true)}>
          {t("addFriend")}
        </IconButton>
      </div>
    </div>
  );
};
