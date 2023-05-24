"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAvatar = void 0;
const react_1 = __importDefault(require("react"));
const useCurrentUser_1 = require("@/hooks/useCurrentUser");
const image_1 = __importDefault(require("next/image"));
const boring_avatars_1 = __importDefault(require("boring-avatars"));
const UserAvatar = ({ height, width, user, }) => {
    var _a, _b, _c, _d;
    const { user: currentUser } = (0, useCurrentUser_1.useCurrentUser)();
    if (user) {
        return (<div className={"z-10 rounded-full overflow-hidden"}>
        {user.image ? (<image_1.default alt={user.name} height={height} width={width} className="rounded-full z-10" src={user.image}/>) : (<boring_avatars_1.default size={width} variant={"beam"} colors={["#3a3132", "#0f4571", "#386dbd", "#009ddd", "#05d3f8"]} name={user.name}/>)}
      </div>);
    }
    else {
        return (<div className={"z-10 rounded-full overflow-hidden will-change-transform "}>
        {((_a = currentUser.data) === null || _a === void 0 ? void 0 : _a.isLoggedIn) && ((_b = currentUser.data) === null || _b === void 0 ? void 0 : _b.image) ? (<image_1.default alt={currentUser.data.name} height={height} width={width} className="rounded-full z-10" src={(_c = currentUser.data) === null || _c === void 0 ? void 0 : _c.image}/>) : (<boring_avatars_1.default size={width} variant={"beam"} colors={["#3a3132", "#0f4571", "#386dbd", "#009ddd", "#05d3f8"]} name={(_d = currentUser.data) === null || _d === void 0 ? void 0 : _d.name}/>)}
      </div>);
    }
};
exports.UserAvatar = UserAvatar;
