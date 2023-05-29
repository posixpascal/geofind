import { Container } from "@/components/layout/Container";
import { MenuItems } from "@/components/layout/MenuItems";
import { LocaleName } from "../../types";
import { pick } from "next/dist/lib/pick";
import {Swipes} from "@/components/ui/Swipes";
import React from "react";

export default function IndexPage() {
  return (
    <Container
      className={
        "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8"
      }
    >
      <MenuItems />
    </Container>
  );
}

const namespaces = ["common", "menu"];
export const getServerSideProps = async ({
  locale,
}: {
  locale: LocaleName;
}) => {
  return {
    props: {
      messages: pick(
        (await import(`../../public/locales/${locale ?? "en"}.json`)).default,
        namespaces
      ),
    },
  };
};
