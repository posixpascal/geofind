import { RoundState } from "@prisma/client";
import { SinglePlayerState } from "@/state/singleplayer";
import {
  SINGLEPLAYER_END_TIME,
  SINGLEPLAYER_PREPARE_TIME,
} from "@/server/constants/timings";
import { trpc } from "@/utils/trpc";
import {
  LngLat,
  LngLatBounds,
  LngLatLike,
  Map,
  Marker,
  Popup,
} from "maplibre-gl";
import { useEffect } from "react";
import cuid from "cuid";

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

  console.log(lineJson);

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
      map.removeSource(`line-${id}`);
      map.removeLayer(`line-animation-${id}`);
    },
  };
};

export const useSinglePlayer = (
  marker: Marker | null,
  game: SinglePlayerState,
  map: Map | null
) => {
  const start = trpc.singleplayer.start.useMutation();
  const prepare = trpc.singleplayer.prepare.useMutation();
  const solve = trpc.singleplayer.solve.useMutation();

  useEffect(() => {
    if (!marker || !game) {
      return;
    }

    const handleRoundState = async () => {
      if (game.roundState === RoundState.PREPARED) {
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
        const result: any = await solve.mutateAsync({
          id: game.id!,
          vote: marker.getLngLat(),
        });

        const newPins: (Marker | Popup)[] = [];

        const newLines: any = [];
        for await (const target of result.target) {
          // Drop a marker
          const pin = new Marker({
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
            left: 20,
            right: 20,
            top: 160,
            bottom: 100,
          },
        });

        setTimeout(() => {
          newPins.forEach((pin) => pin.remove());
          newLines.forEach((line: any) => line.deleteLine());
          prepare.mutateAsync({
            id: game.id!,
          });
        }, SINGLEPLAYER_END_TIME);
      }

      return () => {};
    };

    handleRoundState();
  }, [marker, game]);
};
