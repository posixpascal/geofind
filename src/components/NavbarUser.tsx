import { animated, useSpring } from "@react-spring/web";
import { IconButton } from "@/components/IconButton";
import BackIcon from "@/assets/svgs/icons/back.svg";
import Image from "next/image";
import Avatar from "boring-avatars";
import { signIn, signOut } from "next-auth/react";
import { useTranslation } from "next-i18next";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { MouseEventHandler, useState } from "react";
import { expLevel } from "@/utils/experience";
import { trpc } from "@/utils/trpc";
interface NavbarUserProps {
  back: MouseEventHandler;
  hasBackButton: boolean;
}

export const NavbarUser: React.FC<NavbarUserProps> = ({
  back,
  hasBackButton,
}) => {
  const { t } = useTranslation("common");
  const { user } = useCurrentUser();
  const { x } = useSpring({
    from: { x: 0 },
    x: hasBackButton ? 1 : 0,
    config: { duration: 100 },
  });
  const [experience, setExperience] = useState(0);
  trpc.session.experience.useSubscription(void 0, {
    onData(exp: number) {
      setExperience(exp.total);
    },
  });

  return (
    <>
      <div className={"flex items-center gap-3"}>
        <animated.div
          style={{
            overflow: "hidden",
            opacity: x.interpolate({ range: [0, 1], output: [0, 1] }),
            width: x
              .interpolate({
                range: [0, 1],
                output: [0, 65],
              })
              .interpolate((x) => `${x}px`),
          }}
        >
          <IconButton size={"sm"} onClick={back}>
            <BackIcon className={"h-8 w-8"} />
          </IconButton>
        </animated.div>
        {user.data?.isLoggedIn ? (
          <Image
            alt={user.data.name!}
            height={64}
            width={64}
            className="rounded-full"
            src={user.data?.image!}
          />
        ) : (
          <Avatar
            size={64}
            variant={"beam"}
            name={user.data?.name ?? "guest"}
          />
        )}
        <div className={"flex flex-col flex-grow"}>
          <div className={"leading-6 text-md md:text-xl"}>
            Hallo,&nbsp;
            <span className={"font-bold"}>
              {user.data ? user.data.name : t("loading")}
            </span>
          </div>

          <div className={"gap-1 flex text-sm md:text-md"}>
            {user.data && (
              <div className={"flex"}>Lvl. {expLevel(experience)}</div>
            )}
            <div className={"flex"}></div>
          </div>
        </div>
      </div>
      <div className={"flex gap-4 items-center"}>
        {user.data && user.data.isLoggedIn ? (
          <IconButton onClick={() => signOut()} variant={"primary"}>
            <span className={"hidden sm:inline-block"}>Logout</span>
          </IconButton>
        ) : (
          <IconButton onClick={() => signIn("discord")} variant={"primary"}>
            <span className={"hidden sm:inline-block"}>Login mit Discord</span>
          </IconButton>
        )}

        <IconButton variant={"primary"}>
          <span className={"hidden sm:inline-block"}>Einstellungen</span>
        </IconButton>
      </div>
    </>
  );
};
