import {LocaleName} from "../../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {ReactElement} from "react";
import { Layout } from "@/components/Layout";

export default function SchoolPage() {
    return (
        <div className={'flex flex-col gap-8'}>

        </div>
    );
}

SchoolPage.getLayout = (page: ReactElement) => {
    return <div>hello
        {page}
    </div>
}

export const getServerSideProps = async ({
                                             locale,
                                         }: {
    locale: LocaleName;
}) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ["common", "school", "menu"])),
        },
    };
};
