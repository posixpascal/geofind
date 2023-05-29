import React, {useState} from "react";
import {createMapStyle} from "@/hooks/createMapStyle";
import {trpc} from "@/utils/trpc";
import {LoadingSpinner} from "@/components/utils/LoadingSpinner";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/maps/Map"), {
    loading: () => <LoadingSpinner isLoading={true}/>,
});
export const SpottedCountriesMap = () => {
    const [map, setMap] = useState<any>();
    const spottedCountries = trpc.achievements.spottedCountries.useQuery();

    if (spottedCountries.isLoading) {
        return <></>;
    }

    const mapStyle = createMapStyle();

    mapStyle.layers = mapStyle.layers.map((layer: any) => {
        if (layer.id === "crimea-fill") {
            return {
                id: "crimea-fill",
                type: "fill",
                source: "crimea",
                paint: {
                    "fill-color": "#FFFFFF",
                },
            };
        }

        if (layer.id !== "countries-fill") {
            return layer;
        }

        return {
            id: "countries-fill",
            type: "fill",
            paint: {
                "fill-color": [
                    "match",
                    ["get", "ADM0_A3"],
                    [
                        "NONE",
                        ...spottedCountries.data!.map(
                            (spotted) => spotted.country.isoAlpha3
                        ),
                    ],
                    "#66bd5c",
                    "#ffffff",
                ],
            },
            filter: ["all"],
            layout: {
                visibility: "visible",
            },
            source: "maplibre",
            maxzoom: 24,
            "source-layer": "countries",
        };
    });

    return (
            <Map
                data-cy={"spotted-countries"}
                withMarker={false}
                onMapLoaded={(map) => map.setRenderWorldCopies(false)}
                mapStyle={mapStyle}
            >
                <></>
            </Map>
    );
};
