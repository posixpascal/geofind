import { MenuItems } from "@/components/MenuItems";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LocaleName } from "../../types";

export default function IndexPage() {
  return (
    <div>
      <MenuItems />
    </div>
  );
}

export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "menu"])),
    },
  };
};
