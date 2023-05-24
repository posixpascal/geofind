"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpottedCountriesMap = void 0;
const react_1 = __importStar(require("react"));
const createMapStyle_1 = require("@/hooks/createMapStyle");
const trpc_1 = require("@/utils/trpc");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const dynamic_1 = __importDefault(require("next/dynamic"));
const Map = (0, dynamic_1.default)(() => Promise.resolve().then(() => __importStar(require('@/components/layout/Map'))), {
    loading: () => <LoadingSpinner_1.LoadingSpinner isLoading={true}/>
});
const SpottedCountriesMap = () => {
    const [map, setMap] = (0, react_1.useState)();
    const spottedCountries = trpc_1.trpc.achievements.spottedCountries.useQuery();
    if (spottedCountries.isLoading) {
        return <></>;
    }
    const mapStyle = (0, createMapStyle_1.createMapStyle)();
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
                        ...spottedCountries.data.map((spotted) => spotted.country.isoAlpha3),
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
    return (<Map onMapInstance={(map) => map.setRenderWorldCopies(false)} onMapHandle={setMap} mapStyle={mapStyle}>
                <></>
            </Map>);
};
exports.SpottedCountriesMap = SpottedCountriesMap;
