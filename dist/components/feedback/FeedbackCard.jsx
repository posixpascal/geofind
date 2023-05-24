"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedbackCard = void 0;
const react_1 = __importDefault(require("react"));
const UserAvatar_1 = require("@/components/user/UserAvatar");
const moods = [
    { name: "Excited", value: "excited", icon: "🔥" },
    { name: "Loved", value: "loved", icon: "❤️" },
    { name: "Happy", value: "happy", icon: "😁" },
    { name: "Sad", value: "sad", icon: "🙁" },
    { name: "Thumbsy", value: "thumbsy", icon: "👍" },
    { name: "I feel nothing", value: null, icon: "😶" },
];
const FeedbackCard = ({ feedback }) => {
    return (<div className={"bg-card will-change-transform p-5 rounded-xl"}>
      <div className={"flex justify-between"}>
        <div className={"flex gap-4 items-center text-2xl"}>
          <UserAvatar_1.UserAvatar width={44} height={44} user={feedback.user}/>
          <p className={"font-black text-card-paragraph"}>
            {feedback.user.name}
          </p>
        </div>
        <div className={"text-4xl text-card-headline"}>{feedback.mood}</div>
      </div>
      <p className={"text-xl leading-6 mb-5 mt-2 pb-5"}>
        &quot;{feedback.message}&quot;
      </p>
      <div className={"text-xs"}>
        {feedback.isSolved && <div>✅ Gelöst</div>}

        {!feedback.isSolved && <div>⌛️ Noch nicht gelöst</div>}
      </div>
    </div>);
};
exports.FeedbackCard = FeedbackCard;
