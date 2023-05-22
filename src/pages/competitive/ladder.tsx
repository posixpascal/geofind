import {LocaleName} from "../../../types";
import {pick} from "next/dist/lib/pick";

export default function CompetitiveLadderPage() {
  return (
    <div
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8"
      }
    ></div>
  );
}

const namespaces = ['common', 'menu'];
export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
          (await import(`../../../public/locales/${locale}.json`)).default,
          namespaces
      )
    },
  };
};
