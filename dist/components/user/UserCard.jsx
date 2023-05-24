"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserCard = void 0;
const react_1 = __importDefault(require("react"));
const UserAvatar_1 = require("@/components/user/UserAvatar");
const trpc_1 = require("@/utils/trpc");
const LoadingSpinner_1 = require("@/components/utils/LoadingSpinner");
const IconButton_1 = require("@/components/controls/IconButton");
const UserCard = ({ onClose, user }) => {
    const { data, isLoading } = trpc_1.trpc.profile.user.useQuery({
        id: user.id,
    });
    return (<div className={"relative"}>
      <LoadingSpinner_1.LoadingSpinner isLoading={isLoading}/>
      <div className={"p-4"}>
        <div className={"absolute -top-[60px] left-[50%] -translate-x-1/2 z-20"}>
          <UserAvatar_1.UserAvatar width={80} height={80} user={user}/>
        </div>
      </div>
      <h3 className={"text-center text-2xl font-bold"}>{user.name}</h3>
      {data && data.user && (<>
          <div></div>
        </>)}

      <div className={"flex-col mt-4 flex gap-4"}>
        <IconButton_1.IconButton full={true} variant={"positive"}>
          Folgen
        </IconButton_1.IconButton>
        <IconButton_1.IconButton onClick={onClose} full={true} variant={"negative"}>
          Schließen
        </IconButton_1.IconButton>
      </div>
    </div>);
};
exports.UserCard = UserCard;
