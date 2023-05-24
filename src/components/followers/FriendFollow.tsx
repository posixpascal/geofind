import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { IconButton } from "@/components/controls/IconButton";
import { Input } from "../controls/Input";
import { trpc } from "@/utils/trpc";
import { animated, useTransition } from "@react-spring/web";
import { UserAvatar } from "@/components/user/UserAvatar";

export interface FriendFollowProps {
  onFollow: () => {};
}

export const FriendFollow: React.FC<FriendFollowProps> = ({ onFollow }) => {
  const t = useTranslations("friends");
  const [name, setName] = useState("");
  const [friendCode, setFriendCode] = useState("");
  const users = trpc.friends.lookup.useQuery({
    name,
    friendCode,
  });
  const following = trpc.friends.add.useMutation();

  const transition = useTransition(name && friendCode ? users.data : [], {
    trail: 1400 / (users.data?.length ? users.data!.length : 1),
    from: { opacity: 0, scale: 0 },
    enter: { opacity: 1, scale: 1 },
    leave: { opacity: 0, scale: 0 },
  });

  const follow = () => {
    if (!users.data?.length) {
      return;
    }

    following
      .mutateAsync({
        followingId: users.data[0].id,
      })
      .then(() => {
        setName("");
        setFriendCode("");
        onFollow();
      });
  };

  return (
    <div className={"flex flex-col gap-8"}>
      <header>
        <h3 className={"text-card-headline text-3xl font-black"}>
          {t("add.title")}
        </h3>
        <p className={"text-card-paragraph text-lg"}>{t("add.description")}</p>
      </header>

      <Input
        onChange={(ev) => setName(ev.target.value)}
        name="name"
        type="text"
        label={t("name")}
        placeholder={t("nameOrEmail").toString()}
      />
      <div>
        <Input
          onChange={(ev) => setFriendCode(ev.target.value)}
          name="friendCode"
          type="text"
          label={t("friendCode")}
          placeholder={t("friendCodeSample").toString()}
        />
        <p className={"mt-4 text-card-paragraph text-sm"}>{t("add.hint")}</p>
      </div>

      <div>
        {transition((style, user) => {
          return (
            <animated.div style={style} key={user!.id}>
              <div className={"flex gap-2 will-change-transform items-center"}>
                <UserAvatar width={32} height={32} user={user} />
                {user!.name} &bull; {user!.friendCode} ({user!.experience} Exp)
              </div>
            </animated.div>
          );
        })}
      </div>

      <IconButton onClick={follow} loading={following.isLoading} full={true}>
        {t("follow")}
      </IconButton>
    </div>
  );
};
