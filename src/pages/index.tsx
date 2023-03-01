import {MenuItems} from "@/components/MenuItems";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import {LocaleName} from "../../types";

export default function IndexPage() {
    return (
        <div className={'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8'}>
            <MenuItems/>
        </div>
    );
}

export const getServerSideProps = async ({locale}: {locale: LocaleName}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'menu',
            ])),
        },
    }
};