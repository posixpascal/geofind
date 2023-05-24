"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersOnlineCounter = void 0;
const trpc_1 = require("@/utils/trpc");
const react_1 = require("react");
const next_intl_1 = require("next-intl");
const UsersOnlineCounter = () => {
    const t = (0, next_intl_1.useTranslations)("common");
    const [count, setCount] = (0, react_1.useState)(0);
    trpc_1.trpc.session.onlineCount.useSubscription(undefined, {
        onData({ count }) {
            setCount(count);
        },
    });
    return (<div>
      <h2 className={"text-2xl font-black"}>
        {count} {t("playersOnline")}
      </h2>
    </div>);
};
exports.UsersOnlineCounter = UsersOnlineCounter;
