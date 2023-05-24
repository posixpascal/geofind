import React from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Image from "next/image";
import Avatar from "boring-avatars";
import { User } from "next-auth";

interface UserAvatarProps {
  width: number;
  height: number;
  user?: User;
}
export const UserAvatar: React.FC<UserAvatarProps> = ({
  height,
  width,
  user,
}) => {
  const { user: currentUser } = useCurrentUser();

  if (user) {
    return (
      <div className={"z-10 rounded-full overflow-hidden"}>
        {user.image ? (
          <Image
            alt={user.name!}
            height={height}
            width={width}
            className="rounded-full z-10"
            src={user.image!}
          />
        ) : (
          <Avatar
            size={width}
            variant={"beam"}
            colors={["#3a3132", "#0f4571", "#386dbd", "#009ddd", "#05d3f8"]}
            name={user.name!}
          />
        )}
      </div>
    );
  } else {
    return (
      <div
        className={"z-10 rounded-full overflow-hidden will-change-transform "}
      >
        {currentUser.data?.isLoggedIn && currentUser.data?.image ? (
          <Image
            alt={currentUser.data.name!}
            height={height}
            width={width}
            className="rounded-full z-10"
            src={currentUser.data?.image!}
          />
        ) : (
          <Avatar
            size={width}
            variant={"beam"}
            colors={["#3a3132", "#0f4571", "#386dbd", "#009ddd", "#05d3f8"]}
            name={currentUser.data?.name!}
          />
        )}
      </div>
    );
  }
};
