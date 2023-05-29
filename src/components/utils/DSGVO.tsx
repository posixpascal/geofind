import { useTranslations } from "next-intl";
import { IconButton } from "@/components/ui/IconButton";
import { useLocalStorage } from "react-use";

export const DSGVO = () => {
  const [banner, setBanner] = useLocalStorage("dsgvo", true);
  const t = useTranslations("common");

  if (!banner) {
    return <></>;
  }

  return (
    <div className={"py-20 flex justify-center items-center gap-8"}>
      <div className={"max-w-[550px] mb-5 rounded-xl  p-3 text-paragraph"}>
        <h2 className={"text-xl font-black text-headline"}>
          {t("cookies.title")}
        </h2>
        <p className={"mb-4"}>{t("cookies.description")}</p>
        <div className={"flex gap-4"}>
          <IconButton
            onClick={() => setBanner(false)}
            size={"sm"}
            variant={"positive"}
          >
            {t("cookies.accept")}
          </IconButton>
        </div>
      </div>
      <img
        alt={"Cartoon Cookie Monster"}
        width={260}
        src={"/images/cookies.png"}
      />
    </div>
  );
};
