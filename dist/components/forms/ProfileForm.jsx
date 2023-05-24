"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileForm = void 0;
const next_intl_1 = require("next-intl");
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const Input_1 = require("../controls/Input");
const ProfileForm = () => {
    const { user } = (0, useCurrentUser_1.useCurrentUser)();
    const t = (0, next_intl_1.useTranslations)("profile");
    return (<div>
      <h2 className={"text-3xl font-black text-card-headline"}>
        {t("edit.title")}
      </h2>
      <p className={"text-card-paragraph mb-4"}>{t("edit.description")}</p>

      <div className="grid grid-cols-1 gap-y-8">
        <Input_1.Input name={"username"} label={t("username")} type={"text"} defaultValue={user.data.name}/>

        <Input_1.Input name={"email"} label={t("email")} type={"text"} defaultValue={user.data.email}/>
      </div>
    </div>);
};
exports.ProfileForm = ProfileForm;
