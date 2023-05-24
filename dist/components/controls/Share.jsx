"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Share = void 0;
const react_1 = __importDefault(require("react"));
const next_intl_1 = require("next-intl");
const Input_1 = require("@/components/controls/Input");
const telegram_svg_1 = __importDefault(require("@/assets/svgs/social/telegram.svg"));
const twitter_svg_1 = __importDefault(require("@/assets/svgs/social/twitter.svg"));
const whatsapp_svg_1 = __importDefault(require("@/assets/svgs/social/whatsapp.svg"));
const discord_svg_1 = __importDefault(require("@/assets/svgs/social/discord.svg"));
const Share = ({ url }) => {
    const t = (0, next_intl_1.useTranslations)();
    const socialMedia = [
        {
            icon: <telegram_svg_1.default className={"h-8 w-8 fill-card-paragraph"}/>,
            name: "Telegram",
        },
        {
            icon: <twitter_svg_1.default className={"h-8 w-8 fill-card-paragraph"}/>,
            name: "Twitter",
        },
        {
            icon: <whatsapp_svg_1.default className={"h-8 w-8 fill-card-paragraph"}/>,
            name: "Whatsapp",
        },
        {
            icon: <discord_svg_1.default className={"h-8 w-8 fill-card-paragraph"}/>,
            name: "Discord",
        },
    ];
    return (<div>
      <Input_1.Input label={"Link"} name={"link"} type={"url"} value={url} readOnly={true}/>
      <br />
      Share on:
      <div className={"flex mt-2 gap-12 flex-wrap text-center"}>
        {socialMedia.map((network) => {
            return (<a href={"#"} className={"flex flex-col items-center"} key={network.name}>
              {network.icon}
              {network.name}
            </a>);
        })}
        <a href={"#"} className={"flex flex-col items-center"}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
          More
        </a>
      </div>
    </div>);
};
exports.Share = Share;
