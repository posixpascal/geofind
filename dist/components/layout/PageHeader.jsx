"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageHeader = void 0;
const react_1 = __importDefault(require("react"));
const PageHeader = ({ title, description, icon, }) => {
    return (<div data-page-header className={"flex items-center gap-12 mb-6"}>
      <div className={"flex-grow"}>
        <h3 className={"font-black text-3xl text-headline uppercase"}>
          {title}
        </h3>
        <p className={"text-lg text-paragraph"}>{description}</p>
      </div>
      <div className={"flex-grow flex justify-end"}>{icon}</div>
    </div>);
};
exports.PageHeader = PageHeader;
