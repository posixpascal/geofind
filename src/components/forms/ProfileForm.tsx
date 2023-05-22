import {useTranslations} from "next-intl";
import {useCurrentUser} from "@/hooks/useCurrentUser";
import {Input} from "../controls/Input";

export const ProfileForm = () => {
  const { user } = useCurrentUser();
  const t = useTranslations("profile");

  return (
    <div>
      <h2 className={"text-3xl font-black text-card-headline"}>
        {t("edit.title")}
      </h2>
      <p className={"text-card-paragraph mb-4"}>{t("edit.description")}</p>

      <div className="grid grid-cols-1 gap-y-8">
        <Input
          name={"username"}
          label={t("username")}
          type={"text"}
          defaultValue={user.data!.name!}
        />

        <Input
          name={"email"}
          label={t("email")}
          type={"text"}
          defaultValue={user.data!.email!}
        />
      </div>
    </div>
  );
};
