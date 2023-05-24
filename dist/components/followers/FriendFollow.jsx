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
exports.FriendFollow = void 0;
const react_1 = __importStar(require("react"));
const next_intl_1 = require("next-intl");
const IconButton_1 = require("@/components/controls/IconButton");
const Input_1 = require("../controls/Input");
const trpc_1 = require("@/utils/trpc");
const web_1 = require("@react-spring/web");
const UserAvatar_1 = require("@/components/user/UserAvatar");
const FriendFollow = ({ onFollow }) => {
    var _a;
    const t = (0, next_intl_1.useTranslations)("friends");
    const [name, setName] = (0, react_1.useState)("");
    const [friendCode, setFriendCode] = (0, react_1.useState)("");
    const users = trpc_1.trpc.friends.lookup.useQuery({
        name,
        friendCode,
    });
    const following = trpc_1.trpc.friends.add.useMutation();
    const transition = (0, web_1.useTransition)(name && friendCode ? users.data : [], {
        trail: 1400 / (((_a = users.data) === null || _a === void 0 ? void 0 : _a.length) ? users.data.length : 1),
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });
    const follow = () => {
        var _a;
        if (!((_a = users.data) === null || _a === void 0 ? void 0 : _a.length)) {
            return;
        }
        following
            .mutateAsync({
            followingId: users.data[0].id,
        })
            .then(() => {
            setName("");
            setFriendCode("");
            onFollow();
        });
    };
    return (<div className={"flex flex-col gap-8"}>
      <header>
        <h3 className={"text-card-headline text-3xl font-black"}>
          {t("add.title")}
        </h3>
        <p className={"text-card-paragraph text-lg"}>{t("add.description")}</p>
      </header>

      <Input_1.Input onChange={(ev) => setName(ev.target.value)} name="name" type="text" label={t("name")} placeholder={t("nameOrEmail").toString()}/>
      <div>
        <Input_1.Input onChange={(ev) => setFriendCode(ev.target.value)} name="friendCode" type="text" label={t("friendCode")} placeholder={t("friendCodeSample").toString()}/>
        <p className={"mt-4 text-card-paragraph text-sm"}>{t("add.hint")}</p>
      </div>

      <div>
        {transition((style, user) => {
            return (<web_1.animated.div style={style} key={user.id}>
              <div className={"flex gap-2 will-change-transform items-center"}>
                <UserAvatar_1.UserAvatar width={32} height={32} user={user}/>
                {user.name} &bull; {user.friendCode} ({user.experience} Exp)
              </div>
            </web_1.animated.div>);
        })}
      </div>

      <IconButton_1.IconButton onClick={follow} loading={following.isLoading} full={true}>
        {t("follow")}
      </IconButton_1.IconButton>
    </div>);
};
exports.FriendFollow = FriendFollow;
