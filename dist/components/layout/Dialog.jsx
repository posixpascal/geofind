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
exports.Dialog = void 0;
const react_1 = require("@headlessui/react");
const react_2 = __importStar(require("react"));
const Dialog = ({ title, children, setOpen, open, }) => {
    return (<react_1.Transition.Root show={open} as={react_2.Fragment}>
      <react_1.Dialog as="div" className="relative z-10" onClose={setOpen}>
        <react_1.Transition.Child as={react_2.Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
        </react_1.Transition.Child>

        <div className="fixed w-full inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <react_1.Transition.Child as={react_2.Fragment} enter="ease-out duration-300" enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enterTo="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 translate-y-0 sm:scale-100" leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
              <react_1.Dialog.Panel className="relative transform rounded-lg bg-card px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg sm:p-6">
                <div className={"text-card-headline"}>{title}</div>
                <div className={"text-card-paragraph"}>{children}</div>
              </react_1.Dialog.Panel>
            </react_1.Transition.Child>
          </div>
        </div>
      </react_1.Dialog>
    </react_1.Transition.Root>);
};
exports.Dialog = Dialog;
