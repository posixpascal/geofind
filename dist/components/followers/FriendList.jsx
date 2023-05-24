"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendList = void 0;
const IconButton_1 = require("@/components/controls/IconButton");
const trpc_1 = require("@/utils/trpc");
const react_1 = require("react");
const FriendFollow_1 = require("@/components/followers/FriendFollow");
const Dialog_1 = require("../layout/Dialog");
const next_intl_1 = require("next-intl");
const web_1 = require("@react-spring/web");
const UserAvatar_1 = require("@/components/user/UserAvatar");
const FriendList = () => {
    var _a;
    const t = (0, next_intl_1.useTranslations)("friends");
    const [dialog, showDialog] = (0, react_1.useState)(false);
    const friendList = trpc_1.trpc.friends.list.useQuery();
    const transition = (0, web_1.useTransition)(friendList.data ? friendList.data : [], {
        trail: 1400 / (((_a = friendList.data) === null || _a === void 0 ? void 0 : _a.length) ? friendList.data.length : 1),
        from: { opacity: 0, scale: 0 },
        enter: { opacity: 1, scale: 1 },
        leave: { opacity: 0, scale: 0 },
    });
    const onFollow = () => {
        showDialog(false);
        friendList.refetch();
        return {};
    };
    if (friendList.isLoading) {
        return <></>;
    }
    return (<div>
      <h3 className={"font-black text-card-headline text-xl"}>{t("title")}</h3>
      {friendList.data.length === 0 && (<p className={"text-card-paragraph"}>{t("noFriends")}</p>)}

      {transition((style, { following }) => {
            return (<web_1.animated.div style={style}>
            <div className={"flex will-change-transform text-card-paragraph my-5 items-center gap-2 justify-between"}>
              <div className={"flex items-center gap-2"}>
                <UserAvatar_1.UserAvatar width={32} height={32} user={following}/>
                {following.name}
              </div>
              {following.experience} Exp
            </div>
          </web_1.animated.div>);
        })}
      <Dialog_1.Dialog open={dialog} setOpen={() => showDialog(false)}>
        <FriendFollow_1.FriendFollow onFollow={onFollow}/>
      </Dialog_1.Dialog>
      <div className={"mt-8"}>
        <IconButton_1.IconButton size={"sm"} full={true} onClick={() => showDialog(true)}>
          {t("addFriend")}
        </IconButton_1.IconButton>
      </div>
    </div>);
};
exports.FriendList = FriendList;
