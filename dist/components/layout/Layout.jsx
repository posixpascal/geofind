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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Layout = void 0;
const react_1 = __importStar(require("react"));
const Navbar_1 = require("@/components/layout/Navbar");
const trpc_1 = require("@/utils/trpc");
const web_1 = require("@react-spring/web");
const settings_1 = require("@/state/settings");
const Footer_1 = require("@/components/layout/Footer");
const DSGVO_1 = require("../utils/DSGVO");
const react_2 = require("@legendapp/state/react");
const Layout = ({ children }) => {
    const settings = (0, react_2.useSelector)(() => settings_1.settingsState.get());
    const [ready, setReady] = (0, react_1.useState)(false);
    trpc_1.trpc.settings.subscribe.useSubscription({}, {
        onData(result) {
            web_1.Globals.assign({ skipAnimation: !result.enableAnimations });
            settings_1.settingsState.set(result);
            setReady(true);
        },
    });
    (0, react_1.useEffect)(() => {
        const html = document.querySelector("html");
        if (!html || !settings) {
            return;
        }
        html.setAttribute("class", settings.colorPalette);
    }, [settings]);
    // TODO this slows down rendering
    if (!ready) {
        return <></>;
    }
    return (<main className={settings.colorPalette}>
      <div className={"theme-transition bg-background min-h-screen relative"}>
        <div className={"flex flex-col min-h-screen w-full mx-auto relative"}>
          <Navbar_1.Navbar />
          <div className={"p-3 md:p-5 lg:p-10 "}>{children}</div>
          <div className={"mx-auto w-full max-w-7xl"}>
            <DSGVO_1.DSGVO />
          </div>
        </div>
        <Footer_1.Footer />
      </div>
    </main>);
};
exports.Layout = Layout;
