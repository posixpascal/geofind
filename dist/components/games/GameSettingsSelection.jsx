"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSettingsSelection = void 0;
const Checkbox_1 = require("@/components/controls/Checkbox");
const multiplayer_1 = require("@/state/multiplayer");
const next_intl_1 = require("next-intl");
const react_1 = require("@legendapp/state/react");
const GameSettingsSelection = ({ readOnly, updateAction, }) => {
    const t = (0, next_intl_1.useTranslations)("settings");
    const multiPlayer = (0, react_1.useSelector)(() => multiplayer_1.multiPlayerState.get());
    const settings = [
        {
            key: "isPublic",
        },
        {
            key: "onlyDirectSpots",
        },
        {
            key: "firstSpotWins",
        },
        {
            key: "hasIslands",
        },
    ];
    return (<div className={"flex flex-col py-4 gap-4"}>
      {settings.map((setting) => (<div key={setting.key} className={`flex justify-between bg-background/50 rounded-xl p-4 transition-opacity ${readOnly && !multiPlayer[setting.key] ? "opacity-50" : ""}`}>
          <div className={"text-5xl pr-4"}>
            {t(`games.${setting.key}.emoji`)}
          </div>
          <div className={"flex-grow"}>
            <strong className={"block"}>
              {t(`games.${setting.key}.title`)}
            </strong>
            <p>{t(`games.${setting.key}.description`)}</p>
          </div>
          <Checkbox_1.Checkbox onChange={updateAction(setting.key)} checked={!!multiPlayer[setting.key]}/>
        </div>))}

      {/*<div className={'flex justify-between'}>*/}
      {/*    <div>With islands?</div>*/}
      {/*    <Checkbox onChange={updateAction(} defaultChecked={isPublic}/>*/}
      {/*</div>*/}
    </div>);
};
exports.GameSettingsSelection = GameSettingsSelection;
