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
exports.getServerSideProps = void 0;
const next_intl_1 = require("next-intl");
const react_1 = require("@headlessui/react");
const trpc_1 = require("@/utils/trpc");
const react_2 = __importStar(require("react"));
const web_1 = require("@react-spring/web");
const PageHeader_1 = require("@/components/layout/PageHeader");
const colorPalette_1 = require("@/server/constants/colorPalette");
const ColorSwatch_1 = require("@/components/controls/ColorSwatch");
const Clickable_1 = require("@/components/utils/Clickable");
const Container_1 = require("@/components/layout/Container");
const settings_1 = require("@/state/settings");
const react_3 = require("@legendapp/state/react");
const pick_1 = require("next/dist/lib/pick");
function ProfileSettingsPage() {
    const t = (0, next_intl_1.useTranslations)("settings");
    const settings = (0, react_3.useSelector)(() => settings_1.settingsState.get());
    const userSettings = trpc_1.trpc.settings.list.useQuery();
    const updateSetting = trpc_1.trpc.settings.update.useMutation({
        onMutate(result) {
            settings_1.settingsState.set({
                ...settings,
                [result.key]: result.value,
            }); // todo: type
        },
    });
    const [ready, setReady] = (0, react_2.useState)(false);
    const allSettings = (0, react_2.useMemo)(() => [
        {
            key: "enableAnimations",
            emoji: t("animations.emoji"),
            name: t("animations.title"),
            description: t("animations.description"),
        },
        {
            key: "enableLowPowerMode",
            emoji: t("lowpower.emoji"),
            name: t("lowpower.title"),
            description: t("lowpower.description"),
        },
        {
            key: "enableFriends",
            emoji: t("friends.emoji"),
            name: t("friends.title"),
            description: t("friends.description"),
        },
        {
            key: "enableExperience",
            emoji: t("experience.emoji"),
            name: t("experience.title"),
            description: t("experience.description"),
        },
        {
            key: "enableAds",
            emoji: t("ads.emoji"),
            name: t("ads.title"),
            description: t("ads.description"),
        },
    ], []);
    (0, react_2.useEffect)(() => {
        settings_1.settingsState.set({
            ...userSettings.data,
        });
    }, [userSettings.data]);
    const toggleSetting = (key, value) => {
        updateSetting.mutate({
            key,
            value: value,
        });
    };
    const animation = (0, web_1.useSpringRef)();
    const [transition, api] = (0, web_1.useTransition)(allSettings.length ? allSettings : [], () => ({
        ref: animation,
        trail: 400 / allSettings.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    }));
    const colorSchemeAnimation = (0, web_1.useSpringRef)();
    const [colorSchemeTransition] = (0, web_1.useTransition)(Object.keys(colorPalette_1.COLOR_PALETTES), () => ({
        ref: colorSchemeAnimation,
        trail: 400 / allSettings.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    }));
    (0, react_2.useEffect)(() => {
        animation.start();
        colorSchemeAnimation.start();
    }, [allSettings]);
    if (!settings) {
        return <></>;
    }
    return (<Container_1.Container>
      <PageHeader_1.PageHeader title={t("title")} description={t("description")}/>
      <div className={"grid grid-cols-1 md:grid-cols-2 mt-5 gap-8"}>
        {transition((style, setting) => (
        // TODO: turn into component -> Checkbox
        <web_1.animated.div style={{ ...style }} key={setting.key} className={"bg-card will-change-transform theme-transition flex items-center justify-between rounded-xl p-5"}>
            <div className={"min-w-[60px] text-card-headline text-5xl"}>
              {setting.emoji}
            </div>
            <div className={"flex-grow whitespace-pre-wrap text-card-paragraph"}>
              <h3 className={"text-xl font-black"}>{setting.name}</h3>
              <p>{setting.description}</p>
            </div>
            <div className={"items-center flex gap-2 ml-4"}>
              <span className={"text-card-paragraph"}>
                {settings[setting.key] ? "An" : "Aus"}
              </span>
              <react_1.Switch defaultChecked={!!settings[setting.key]} onClick={(e) => toggleSetting(setting.key, !settings[setting.key])} className={`
                                    ${settings[setting.key]
                ? "bg-tertiary"
                : "bg-background"}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-button focus:ring-offset-2`}>
                <span className="sr-only">Use setting</span>
                <span aria-hidden="true" className={`
                                        ${settings[setting.key]
                ? "translate-x-5"
                : "translate-x-0"}
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    `}/>
              </react_1.Switch>
            </div>
          </web_1.animated.div>))}
      </div>

      <PageHeader_1.PageHeader title={t("colorSchemeTitle")} description={t("colorSchemeDescription")}/>
      <div className={"grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 mt-5 gap-8"}>
        {colorSchemeTransition((style, colorPaletteKey) => (<Clickable_1.Clickable key={colorPaletteKey} onClick={() => toggleSetting("colorPalette", colorPaletteKey)}>
            <web_1.animated.div style={{
                ...style,
                background: colorPalette_1.COLOR_PALETTES[colorPaletteKey].background,
            }} className={`flex items-center justify-between rounded-xl p-5 relative`}>
              <ColorSwatch_1.ColorSwatch color={colorPalette_1.COLOR_PALETTES[colorPaletteKey].button}/>
              <ColorSwatch_1.ColorSwatch color={colorPalette_1.COLOR_PALETTES[colorPaletteKey].tertiary}/>
              <ColorSwatch_1.ColorSwatch color={colorPalette_1.COLOR_PALETTES[colorPaletteKey].secondary}/>
              <ColorSwatch_1.ColorSwatch color={colorPalette_1.COLOR_PALETTES[colorPaletteKey].paragraph}/>
              <ColorSwatch_1.ColorSwatch color={colorPalette_1.COLOR_PALETTES[colorPaletteKey].headline}/>
              {(settings === null || settings === void 0 ? void 0 : settings.colorPalette) === colorPaletteKey && (<span className={"absolute -top-2 -right-2"}>✅</span>)}
            </web_1.animated.div>
          </Clickable_1.Clickable>))}
      </div>
    </Container_1.Container>);
}
exports.default = ProfileSettingsPage;
const namespaces = ['common', 'settings', 'menu'];
const getServerSideProps = async ({ locale, }) => {
    var _a;
    return {
        props: {
            messages: (0, pick_1.pick)((await (_a = `../../../public/locales/${locale}.json`, Promise.resolve().then(() => __importStar(require(_a))))).default, namespaces)
        },
    };
};
exports.getServerSideProps = getServerSideProps;
