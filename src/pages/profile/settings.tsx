import {LocaleName} from "../../../types";
import {useTranslations} from "next-intl";
import React from "react";
import {PageHeader} from "@/components/layout/PageHeader";
import {Container} from "@/components/layout/Container";
import {pick} from "next/dist/lib/pick";
import {Box} from "@/components/layout/Box";
import {PageHeaderIcon} from "@/components/layout/PageHeaderIcon";
import {ColorPaletteSelection} from "@/components/forms/ColorPaletteSelection";
import {AppSettingsSelection} from "@/components/forms/AppSettingsSelection";
import {PinSelection} from "@/components/forms/PinSelection";

export default function ProfileSettingsPage() {
    const t = useTranslations("settings");

    return (
        <Container>
            <PageHeader
                title={t("title")}
                description={t("description")}
                icon={<PageHeaderIcon icon={"⚙️"}/>}
            />
            <div className={"grid grid-cols-5 gap-8"}>
                <div className={"col-span-3"}>
                    <div className={'flex flex-col gap-4'}>
                        <Box
                            title={t("generalTitle")}
                            description={t("generalDescription")}
                            mass={2}
                        >
                            <AppSettingsSelection/>
                        </Box>
                        <Box
                            title={t("colorSchemeTitle")}
                            mass={1.0}
                            delay={300}
                            description={t("colorSchemeDescription")}
                        >
                            <ColorPaletteSelection/>
                        </Box>
                    </div>
                </div>
                <div className={"col-span-2"}>
                    <div className={'flex flex-col gap-4'}>
                        <Box
                            title={t("pinsTitle")}
                            description={t("pinsDescription")}
                            mass={1.0}
                            delay={300}
                        >
                            <PinSelection/>
                        </Box>

                    </div>
                </div>
            </div>
        </Container>
    );
}

const namespaces = ["common", "settings", "menu"];
export const getServerSideProps = async ({
                                             locale,
                                         }: {
    locale: LocaleName;
}) => {
    return {
        props: {
            messages: pick(
                (await import(`../../../public/locales/${locale ?? "en"}.json`))
                    .default,
                namespaces
            ),
        },
    };
};
