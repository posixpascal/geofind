import {CountryFact, RoundState} from "@prisma/client";
import {SinglePlayerState} from "@/state/singleplayer";
import {SINGLEPLAYER_PREPARE_TIME,} from "@/server/constants/timings";
import {trpc} from "@/utils/trpc";
import {LngLat, LngLatBounds, Map, Marker, Popup} from "maplibre-gl";
import {useEffect} from "react";
import cuid from "cuid";
import {factsState} from "@/state/facts";
import {COUNTRY_LABELS} from "@/hooks/createMapStyle";

const animateLineOn = (
  map: Map,
  { from, to }: { from: LngLat; to: LngLat }
) => {
  let id = cuid();
  const lineJson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [from.lng, from.lat],
            [to.lng, to.lat],
          ],
        },
      },
    ],
  };

  map.addSource(`line-${id}`, {
    type: "geojson",
    data: lineJson,
  });

  map.addLayer({
    id: `line-animation-${id}`,
    type: "line",
    source: `line-${id}`,
    layout: {
      "line-cap": "round",
      "line-join": "round",
    },
    paint: {
      "line-color": "#ed6498",
      "line-width": 5,
      "line-opacity": 0.7,
    },
  });

  return {
    coordinates: lineJson.features[0].geometry.coordinates,
    deleteLine: () => {
      map.removeLayer(`line-animation-${id}`);
      map.removeSource(`line-${id}`);
    },
  };
};

let newPins: (Marker | Popup)[] = [];
let newLines: any = [];

export const useSinglePlayer = (
  marker: Marker | null,
  game: SinglePlayerState,
  map: Map | null
) => {
  const start = trpc.singleplayer.start.useMutation();
  const prepare = trpc.singleplayer.prepare.useMutation();
  const solve = trpc.singleplayer.solve.useMutation();
  const fetchFacts = trpc.countries.facts.useMutation();

  useEffect(() => {
    if (!marker || !game) {
      return;
    }

    const handleRoundState = async () => {
      if (game.roundState === RoundState.PREPARED) {
        if (map?.isStyleLoaded()) {
          map!.removeLayer(COUNTRY_LABELS.id);
        }
        newPins.forEach((pin) => pin.remove());
        newLines.forEach((line: any) => line.deleteLine());
        newPins = [];
        newLines = [];

        factsState.set([]);
        map!.zoomTo(2, {
          duration: 800,
        });

        return setTimeout(() => {
          start.mutate({
            id: game.id!,
          });
        }, SINGLEPLAYER_PREPARE_TIME);
      }

      if (game.roundState === RoundState.ENDED) {
        fetchFacts.mutate(
          {
            id: game.countryId!,
          },
          {
            onSuccess(data: CountryFact[]) {
              factsState.set(data);
            },
          }
        );

        const result: any = await solve.mutateAsync({
          id: game.id!,
          vote: marker.getLngLat(),
        });

        for await (const target of result.target) {
          // Drop a marker
          const pin = new Marker({
            scale: 0.8,
            color: "#000",
          }).setLngLat([target.lng, target.lat]);
          pin.addTo(map!);
          newPins.push(pin);
          newLines.push(
            animateLineOn(map!, {
              from: marker.getLngLat(),
              to: pin.getLngLat(),
            })
          );
        }

        const bounds = newLines.reduce(
          (bounds: LngLatBounds, { coordinates }: { coordinates: any }) => {
            return bounds.extend(coordinates);
          },
          new LngLatBounds()
        );

        map!.fitBounds(bounds, {
          padding: {
            left: 40,
            right: 40,
            top: 160,
            bottom: 100,
          },
        });

        setTimeout(() => {
          map!.addLayer(COUNTRY_LABELS as any);
        }, 500);
        // TODO: allow automatic skip
        // setTimeout(() => {
        //     prepare.mutateAsync({
        //         id: game.id!,
        //     });
        // }, SINGLEPLAYER_END_TIME);
      }

      return () => {};
    };

    handleRoundState();
  }, [marker, game]);
};
