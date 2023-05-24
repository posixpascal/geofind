"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.useSinglePlayer = void 0;
const timings_1 = require("@/server/constants/timings");
const trpc_1 = require("@/utils/trpc");
const maplibre_gl_1 = require("maplibre-gl");
const react_1 = require("react");
const cuid_1 = __importDefault(require("cuid"));
const facts_1 = require("@/state/facts");
const createMapStyle_1 = require("@/hooks/createMapStyle");
const animateLineOn = (map, { from, to }) => {
    let id = (0, cuid_1.default)();
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
let newPins = [];
let newLines = [];
const useSinglePlayer = (marker, game, map) => {
    const start = trpc_1.trpc.singleplayer.start.useMutation();
    const prepare = trpc_1.trpc.singleplayer.prepare.useMutation();
    const solve = trpc_1.trpc.singleplayer.solve.useMutation();
    const fetchFacts = trpc_1.trpc.countries.facts.useMutation();
    (0, react_1.useEffect)(() => {
        if (!marker || !game) {
            return;
        }
        const handleRoundState = async () => {
            if (game.roundState === "PREPARED") {
                if (map === null || map === void 0 ? void 0 : map.isStyleLoaded()) {
                    map.removeLayer(createMapStyle_1.COUNTRY_LABELS.id);
                }
                newPins.forEach((pin) => pin.remove());
                newLines.forEach((line) => line.deleteLine());
                newPins = [];
                newLines = [];
                facts_1.factsState.set([]);
                map.zoomTo(2, {
                    duration: 800,
                });
                return setTimeout(() => {
                    start.mutate({
                        id: game.id,
                    });
                }, timings_1.SINGLEPLAYER_PREPARE_TIME);
            }
            if (game.roundState === "ENDED") {
                fetchFacts.mutate({
                    id: game.countryId,
                }, {
                    onSuccess(data) {
                        facts_1.factsState.set(data);
                    },
                });
                const result = await solve.mutateAsync({
                    id: game.id,
                    vote: marker.getLngLat(),
                });
                for await (const target of result.target) {
                    // Drop a marker
                    const pin = new maplibre_gl_1.Marker({
                        scale: 0.8,
                        color: "#000",
                    }).setLngLat([target.lng, target.lat]);
                    pin.addTo(map);
                    newPins.push(pin);
                    newLines.push(animateLineOn(map, {
                        from: marker.getLngLat(),
                        to: pin.getLngLat(),
                    }));
                }
                const bounds = newLines.reduce((bounds, { coordinates }) => {
                    return bounds.extend(coordinates);
                }, new maplibre_gl_1.LngLatBounds());
                map.fitBounds(bounds, {
                    padding: {
                        left: 40,
                        right: 40,
                        top: 160,
                        bottom: 100,
                    },
                });
                setTimeout(() => {
                    map.addLayer(createMapStyle_1.COUNTRY_LABELS);
                }, 500);
                // TODO: allow automatic skip
                // setTimeout(() => {
                //     prepare.mutateAsync({
                //         id: game.id!,
                //     });
                // }, SINGLEPLAYER_END_TIME);
            }
            return () => { };
        };
        handleRoundState();
    }, [marker, game]);
};
exports.useSinglePlayer = useSinglePlayer;
