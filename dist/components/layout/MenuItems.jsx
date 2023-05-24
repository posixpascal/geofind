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
exports.MenuItems = void 0;
const react_1 = __importStar(require("react"));
const Tile_1 = require("@/components/layout/Tile");
const Tag_1 = require("../utils/Tag");
const router_1 = require("next/router");
const trpc_1 = require("@/utils/trpc");
const Clickable_1 = require("../utils/Clickable");
const web_1 = require("@react-spring/web");
const link_1 = __importDefault(require("next/link"));
const next_plausible_1 = require("next-plausible");
const next_intl_1 = require("next-intl");
const MenuItems = () => {
    const t = (0, next_intl_1.useTranslations)("menu");
    const router = (0, router_1.useRouter)();
    const plausible = (0, next_plausible_1.usePlausible)();
    const createSinglePlayer = trpc_1.trpc.singleplayer.create.useMutation();
    const createMultiPlayer = trpc_1.trpc.multiplayer.create.useMutation();
    const handleSinglePlayerClick = async () => {
        const result = await createSinglePlayer.mutateAsync();
        plausible("Singleplayer");
        await router.push("/singleplayer/" + result.id);
    };
    const handleMultiPlayerClick = async () => {
        const result = await createMultiPlayer.mutateAsync();
        plausible("Multiplayer");
        await router.push("/multiplayer/" + result.id);
    };
    const menuItems = [
        {
            onClick: handleSinglePlayerClick,
            icon: "🎓",
            tag: <Tag_1.Tag variant={"green"} title={t("tags.singleplayer")}/>,
            title: t("singleplayer.title"),
            content: t("singleplayer.content"),
        },
        {
            onClick: handleMultiPlayerClick,
            icon: "🌎",
            tag: <Tag_1.Tag variant={"blue"} title={t("tags.multiplayer")}/>,
            title: t("multiplayer_create.title"),
            content: t("multiplayer_create.content"),
        },
        {
            to: "/multiplayer/join",
            icon: "🕹️",
            tag: <Tag_1.Tag variant={"blue"} title={t("tags.multiplayer")}/>,
            title: t("multiplayer_join.title"),
            content: t("multiplayer_join.content"),
        },
        {
            to: "/competitive/ladder",
            icon: "⚔️",
            tag: <Tag_1.Tag variant={"red"} title={t("tags.competitive")}/>,
            title: t("competitive_ladder.title"),
            content: t("competitive_ladder.content"),
        },
        {
            to: "/competitive/timetrial",
            icon: "⏱️",
            tag: <Tag_1.Tag variant={"red"} title={t("tags.competitive")}/>,
            title: t("competitive_timetrial.title"),
            content: t("competitive_timetrial.content"),
        },
        {
            to: "/profile/achievements",
            icon: "🏅",
            tag: <Tag_1.Tag variant={"orange"} title={t("tags.profile")}/>,
            title: t("achievements.title"),
            content: t("achievements.content"),
        },
        // {
        //   to: "/profile/pins",
        //   icon: <PinIcon className={"w-[80px] h-[80px]"} />,
        //   tag: <Tag variant={"orange"} title={t("tags.profile")} />,
        //   title: t("pins.title"),
        //   content: t("pins.content"),
        // },
        {
            to: "/profile/",
            icon: "🦜",
            tag: <Tag_1.Tag variant={"orange"} title={t("tags.profile")}/>,
            title: t("profile.title"),
            content: t("profile.content"),
        },
        {
            to: "/profile/settings",
            icon: "🔨",
            tag: <Tag_1.Tag variant={"orange"} title={t("tags.profile")}/>,
            title: t("settings.title"),
            content: t("settings.content"),
        },
        {
            to: "/feedback",
            icon: "✉️",
            tag: <Tag_1.Tag variant={"gray"} title={t("tags.other")}/>,
            title: t("feedback.title"),
            content: t("feedback.content"),
        },
        // {
        //   to: "/school",
        //   icon: "👩‍🏫️",
        //   tag: <Tag variant={"purple"} title={t("tags.school")} />,
        //   title: t("school.title"),
        //   content: t("school.content"),
        // },
    ];
    const animation = (0, web_1.useSpringRef)();
    const [transition, api] = (0, web_1.useTransition)(menuItems, () => ({
        ref: animation,
        trail: 500 / menuItems.length,
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
        config: {
            mass: 1.5,
        },
    }), []);
    (0, react_1.useEffect)(() => {
        api.start();
    }, [menuItems]);
    return transition((styles, menuItem) => (<web_1.animated.div style={styles} key={menuItem.title}>
      {"onClick" in menuItem && (<Clickable_1.Clickable key={menuItem.title} onClick={menuItem.onClick}>
          <Tile_1.Tile {...menuItem}/>
        </Clickable_1.Clickable>)}
      {!("onClick" in menuItem) && (<link_1.default href={menuItem.to} key={menuItem.to}>
          <Tile_1.Tile key={menuItem.to} {...menuItem}/>
        </link_1.default>)}
    </web_1.animated.div>));
};
exports.MenuItems = MenuItems;
