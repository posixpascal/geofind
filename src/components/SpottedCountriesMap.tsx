import { Map } from "@/components/Map";
import React, { useState } from "react";
import { createMapStyle } from "@/hooks/createMapStyle";
import { trpc } from "@/utils/trpc";

export const SpottedCountriesMap = () => {
  const [map, setMap] = useState<any>();
  const spottedCountries = trpc.achievements.spottedCountries.useQuery();

  if (spottedCountries.isLoading) {
    return <></>;
  }

  const mapStyle = createMapStyle();

  mapStyle.layers = mapStyle.layers.map((layer) => {
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
            ...spottedCountries.data.map(
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
    <div className={"bg-[#d8f2ff] rounded-xl overflow-hidden"}>
      <Map onMapHandle={setMap} mapStyle={mapStyle}>
        <></>
      </Map>
    </div>
  );
};
