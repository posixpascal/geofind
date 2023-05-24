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
exports.getServerSideProps = void 0;
const default_svg_1 = __importDefault(require("@/assets/svgs/pins/default.svg"));
const react_1 = require("react");
const colorPalette_1 = require("@/server/constants/colorPalette");
const pick_1 = require("next/dist/lib/pick");
function ProfilePinPage() {
    const pinList = (0, react_1.useMemo)(() => {
        const pins = [
            {
                group: "standard",
                component: <default_svg_1.default />,
            },
        ];
        return pins.map(({ group, component }) => {
            return (<div key={group} className={"grid grid-cols-4"}>
          {colorPalette_1.TAILWIND_TEXT_COLORS.map((color) => (<>
              <div key={color} className={color}>
                {component}
              </div>
            </>))}
        </div>);
        });
    }, []);
    return (<div className={"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 sm:gap-8"}>
      {pinList}
    </div>);
}
exports.default = ProfilePinPage;
const namespaces = ['common', 'menu'];
const getServerSideProps = async ({ locale, }) => {
    var _a;
    return {
        props: {
            messages: (0, pick_1.pick)((await (_a = `../../../public/locales/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a))))).default, namespaces)
        },
    };
};
exports.getServerSideProps = getServerSideProps;
