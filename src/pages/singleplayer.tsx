import {LocaleName} from "../../types";
import {serverSideTranslations} from "next-i18next/serverSideTranslations";
import React, {useState} from "react";
import {Map} from "@/components/Map";
import maplibregl from "maplibre-gl";

export default function Singleplayer() {
    const [map, setMap] = useState<maplibregl.Map | null>(null);


    return (
        <Map onMapHandle={setMap}>
            <div className={'absolute left-5 top-0 bg-white p-5'}>
                Test
            </div>
        </Map>
    );
}

export const getServerSideProps = async ({locale}: { locale: LocaleName }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, [
                'common',
                'menu',
            ])),
        },
    }
};