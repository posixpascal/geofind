"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DSGVO = void 0;
const next_intl_1 = require("next-intl");
const IconButton_1 = require("@/components/controls/IconButton");
const react_use_1 = require("react-use");
const DSGVO = () => {
    const [banner, setBanner] = (0, react_use_1.useLocalStorage)("dsgvo", true);
    const t = (0, next_intl_1.useTranslations)("common");
    if (!banner) {
        return <></>;
    }
    return (<div className={"py-20 flex justify-center items-center gap-8"}>
      <div className={"max-w-[550px] mb-5 rounded-xl  p-3 text-paragraph"}>
        <h2 className={"text-xl font-black text-headline"}>
          {t("cookies.title")}
        </h2>
        <p className={"mb-4"}>{t("cookies.description")}</p>
        <div className={"flex gap-4"}>
          <IconButton_1.IconButton onClick={() => setBanner(false)} size={"sm"} variant={"positive"}>
            {t("cookies.accept")}
          </IconButton_1.IconButton>
        </div>
      </div>
      <img alt={"Cartoon Cookie Monster"} width={260} src={"/images/cookies.png"}/>
    </div>);
};
exports.DSGVO = DSGVO;
