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
exports.Map = void 0;
const react_1 = __importStar(require("react"));
const createMapStyle_1 = require("@/hooks/createMapStyle");
const maplibre_gl_1 = __importDefault(require("maplibre-gl"));
const web_1 = require("@react-spring/web");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const Map = ({ onMapHandle, mapStyle, children, onMapInstance, }) => {
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [map, setMap] = (0, react_1.useState)(null);
    const style = mapStyle !== null && mapStyle !== void 0 ? mapStyle : (0, createMapStyle_1.createMapStyle)();
    const mapContainer = (0, react_1.useRef)(null);
    const { x } = (0, web_1.useSpring)({
        from: { x: 0 },
        x: loading ? 0 : 1,
        config: { duration: 300 },
    });
    (0, react_1.useEffect)(() => {
        if (map)
            return;
        const mapCtrl = new maplibre_gl_1.default.Map({
            container: mapContainer.current,
            style: style,
        });
        mapCtrl.on("load", () => {
            setLoading(false);
        });
        if (onMapInstance) {
            onMapInstance(mapCtrl);
        }
        setMap(mapCtrl);
    }, [map, setMap, style]);
    (0, react_1.useEffect)(() => {
        if (!map) {
            return;
        }
        onMapHandle(map);
    }, [onMapHandle, map]);
    return (<div>
      <LoadingSpinner_1.LoadingSpinner isLoading={loading}/>
      <web_1.animated.div style={{
            opacity: x.interpolate({
                range: [0, 1],
                output: [0, 1],
            }),
        }} className={"absolute inset-0 w-min-screen h-min-screen"}>
        <div style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            width: "100%",
        }} ref={mapContainer}></div>
        {children}
      </web_1.animated.div>
    </div>);
};
exports.Map = Map;
exports.default = exports.Map;
