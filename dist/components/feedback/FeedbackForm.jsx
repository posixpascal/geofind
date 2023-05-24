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
exports.FeedbackForm = void 0;
const react_1 = require("@headlessui/react");
const react_2 = __importStar(require("react"));
const IconButton_1 = require("@/components/controls/IconButton");
const moods = [
    { name: "Excited", value: "excited", icon: "🔥" },
    { name: "Loved", value: "loved", icon: "❤️" },
    { name: "Happy", value: "happy", icon: "😁" },
    { name: "Sad", value: "sad", icon: "🙁" },
    { name: "Thumbsy", value: "thumbsy", icon: "👍" },
    { name: "I feel nothing", value: null, icon: "😶" },
];
const FeedbackForm = ({ onSubmit, loading, }) => {
    const [selected, setSelected] = (0, react_2.useState)(moods[2]);
    const [message, setMessage] = (0, react_2.useState)("");
    const [isPublic, setIsPublic] = (0, react_2.useState)(false);
    const submit = (ev) => {
        onSubmit(message, selected, isPublic).then(() => {
            setIsPublic(false);
            setMessage("");
            setSelected(moods[2]);
        });
        ev.preventDefault();
        return false;
    };
    return (<form onSubmit={submit} action="src/components#" className="relative">
      <div className="overflow-hidden rounded-lg shadow-sm ">
        <label htmlFor="comment" className="sr-only">
          Add your comment
        </label>
        <textarea rows={5} name="comment" id="comment" value={message} onChange={(ev) => setMessage(ev.target.value)} className="block bg-white w-full resize-none border-0 bg-transparent text-gray-900
                dark:text-slate-200
                placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 lg:text-xl
                lg:py-4 lg:px-5 mb-20" placeholder="Add your comment..."/>
      </div>

      <div className="absolute bg-gray-100 rounded-b-lg border-t border-gray-200 inset-x-0 bottom-0 flex justify-between py-3 px-5
            dark:bg-slate-800 dark:border-slate-600
        ">
        <div className="flex items-center space-x-5">
          <div className="flex items-center">
            <react_1.Listbox value={selected} onChange={setSelected}>
              {({ open }) => (<>
                  <react_1.Listbox.Label className="sr-only"> Your mood </react_1.Listbox.Label>
                  <div className="relative">
                    <react_1.Listbox.Button className="relative flex items-center justify-center rounded-full
                                        text-gray-400 rounded-full h-12 w-12 hover:text-gray-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                      <span className="flex items-center justify-center">
                        {selected.value === null ? (<span>
                            <span className="text-3xl" aria-hidden="true">
                              😶
                            </span>
                            <span className="sr-only"> Add your mood </span>
                          </span>) : (<span>
                            <span className={"flex h-8 w-8 items-center justify-center rounded-full"}>
                              <span className="flex-shrink-0 text-3xl" aria-hidden="true">
                                {selected.icon}
                              </span>
                            </span>
                            <span className="sr-only">{selected.name}</span>
                          </span>)}
                      </span>
                    </react_1.Listbox.Button>

                    <react_1.Transition show={open} as={react_2.Fragment} leave="transition ease-in duration-100" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <react_1.Listbox.Options className="absolute z-10 mt-1 -ml-6 w-60 rounded-lg bg-white dark:bg-slate-700 py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                        {moods.map((mood) => (<react_1.Listbox.Option key={mood.value} className={({ active }) => `
                                          ${active
                    ? "bg-gray-100 dark:bg-slate-600"
                    : "bg-white dark:bg-slate-700"} relative cursor-default select-none py-2 px-3
                                          `} value={mood}>
                            <div className="flex items-center">
                              <div className={"flex h-8 w-8 items-center justify-center rounded-full"}>
                                <span className={"text-xl flex-shrink-0"}>
                                  {mood.icon}
                                </span>
                              </div>
                              <span className="ml-3 block truncate font-medium">
                                {mood.name}
                              </span>
                            </div>
                          </react_1.Listbox.Option>))}
                      </react_1.Listbox.Options>
                    </react_1.Transition>
                  </div>
                </>)}
            </react_1.Listbox>
          </div>
        </div>
        <div className="flex-shrink-0 flex  items-center gap-8 pb-2">
          <div className={"flex gap-4"}>
            <react_1.Switch defaultChecked={isPublic} onChange={(value) => setIsPublic(value)} className={`
                                    ${isPublic
            ? "bg-orange-600"
            : "bg-gray-200 dark:bg-slate-600"}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-orange-600 focus:ring-offset-2`}>
              <span className="sr-only">Use setting</span>
              <span aria-hidden="true" className={`
                                        ${isPublic
            ? "translate-x-5"
            : "translate-x-0"}
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    `}/>
            </react_1.Switch>
            Öffentlich posten
          </div>

          <IconButton_1.IconButton loading={loading}>Post</IconButton_1.IconButton>
        </div>
      </div>
    </form>);
};
exports.FeedbackForm = FeedbackForm;
