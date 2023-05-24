"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Checkbox = void 0;
const react_1 = require("@headlessui/react");
const react_2 = __importDefault(require("react"));
const Checkbox = ({ checked = false, defaultChecked = false, onChange, }) => {
    return (<div className={"items-center flex gap-2 ml-4"}>
      <span className={"text-card-paragraph"}>{checked ? "An" : "Aus"}</span>
      <react_1.Switch defaultChecked={defaultChecked} checked={checked} onClick={(e) => onChange(!checked)} className={`
                                    ${checked ? "bg-tertiary" : "bg-background"}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-button focus:ring-offset-2`}>
        <span className="sr-only">Use setting</span>
        <span aria-hidden="true" className={`
                                        ${checked
            ? "translate-x-5"
            : "translate-x-0"}
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    `}/>
      </react_1.Switch>
    </div>);
};
exports.Checkbox = Checkbox;
