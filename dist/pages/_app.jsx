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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServerSideProps = void 0;
require("@/styles/globals.css");
const trpc_1 = require("@/utils/trpc");
const Layout_1 = require("@/components/layout/Layout");
const react_1 = __importDefault(require("react"));
const react_2 = require("next-auth/react");
const next_plausible_1 = __importDefault(require("next-plausible"));
const AuthProvider_1 = require("@/components/utils/AuthProvider");
const next_intl_1 = require("next-intl");
const GeofindApp = ({ Component, pageProps, }) => {
    const content = (<next_plausible_1.default enabled={true} selfHosted={true} customDomain={"http://localhost:8000"} trackLocalhost={true} domain={"geofind.io"}>
            <Component {...pageProps}/>
        </next_plausible_1.default>);
    const page = Component.getLayout ? (Component.getLayout(content)) : (<Layout_1.Layout>{content}</Layout_1.Layout>);
    return (<next_intl_1.NextIntlProvider messages={pageProps.messages}>
            <react_2.SessionProvider session={pageProps.session}>
                <AuthProvider_1.AuthProvider session={pageProps.session}>{page}</AuthProvider_1.AuthProvider>
            </react_2.SessionProvider>
        </next_intl_1.NextIntlProvider>);
};
async function getServerSideProps(ctx) {
    const session = await (0, react_2.getSession)(ctx);
    return {
        session,
        messages: (await (_a = `../../public/locales/${ctx.locale}.json`, Promise.resolve().then(() => __importStar(require(_a)))))
    };
}
exports.getServerSideProps = getServerSideProps;
exports.default = trpc_1.trpc.withTRPC(GeofindApp);
