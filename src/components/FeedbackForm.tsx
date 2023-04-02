import {Listbox, Switch, Transition} from "@headlessui/react";
import React, {FormEvent, Fragment, useState} from "react";
import {IconButton} from "@/components/IconButton";

const moods = [
    {name: 'Excited', value: 'excited', icon: '🔥'},
    {name: 'Loved', value: 'loved', icon: '❤️'},
    {name: 'Happy', value: 'happy', icon: "😁"},
    {name: 'Sad', value: 'sad', icon: "🙁"},
    {name: 'Thumbsy', value: 'thumbsy', icon: "👍"},
    {name: 'I feel nothing', value: null, icon: "😶"},
]

interface FeedbackFormProps {
    loading: boolean;
    onSubmit: Function
}

export const FeedbackForm: React.FC<FeedbackFormProps> = ({onSubmit, loading}) => {
    const [selected, setSelected] = useState(moods[2])
    const [message, setMessage] = useState('');
    const [isPublic, setIsPublic] = useState(false);

    const submit = (ev: FormEvent<HTMLFormElement>) => {
        onSubmit(message, selected, isPublic).then(() => {
            setIsPublic(false);
            setMessage('');
            setSelected(moods[2])
        });
        ev.preventDefault();
        return false;
    }

    return <form onSubmit={submit} action="#" className="relative">
        <div
            className="overflow-hidden rounded-lg shadow-sm ">
            <label htmlFor="comment" className="sr-only">
                Add your comment
            </label>
            <textarea
                rows={5}
                name="comment"
                id="comment"
                value={message}
                onChange={(ev) => setMessage(ev.target.value)}
                className="block bg-white w-full resize-none border-0 bg-transparent text-gray-900
                dark:text-slate-200
                placeholder:text-gray-400 focus:ring-0 sm:py-1.5 sm:text-sm sm:leading-6 lg:text-xl
                lg:py-4 lg:px-5 mb-20"
                placeholder="Add your comment..."
            />
        </div>

        <div className="absolute bg-gray-100 rounded-b-lg border-t border-gray-200 inset-x-0 bottom-0 flex justify-between py-3 px-5
            dark:bg-slate-800 dark:border-slate-600
        ">
            <div className="flex items-center space-x-5">
                <div className="flex items-center">
                    <Listbox value={selected} onChange={setSelected}>
                        {({open}) => (
                            <>
                                <Listbox.Label className="sr-only"> Your mood </Listbox.Label>
                                <div className="relative">
                                    <Listbox.Button
                                        className="relative flex items-center justify-center rounded-full
                                        text-gray-400 rounded-full h-12 w-12 hover:text-gray-500 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-800">
                          <span className="flex items-center justify-center">
                            {selected.value === null ? (
                                <span>
                                <span className="text-3xl" aria-hidden="true">
                                  😶
                                </span>
                                <span className="sr-only"> Add your mood </span>
                              </span>
                            ) : (
                                <span>
                                <span
                                    className={
                                        'flex h-8 w-8 items-center justify-center rounded-full'
                                    }
                                >
                                  <span className="flex-shrink-0 text-3xl" aria-hidden="true">
                                    {selected.icon}
                                  </span>
                                </span>
                                <span className="sr-only">{selected.name}</span>
                              </span>
                            )}
                          </span>
                                    </Listbox.Button>

                                    <Transition
                                        show={open}
                                        as={Fragment}
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <Listbox.Options
                                            className="absolute z-10 mt-1 -ml-6 w-60 rounded-lg bg-white dark:bg-slate-700 py-3 text-base shadow ring-1 ring-black ring-opacity-5 focus:outline-none sm:ml-auto sm:w-64 sm:text-sm">
                                            {moods.map((mood) => (
                                                <Listbox.Option
                                                    key={mood.value}
                                                    className={({active}) => `
                                          ${active ? 'bg-gray-100 dark:bg-slate-600' : 'bg-white dark:bg-slate-700'} relative cursor-default select-none py-2 px-3
                                          `}
                                                    value={mood}
                                                >
                                                    <div className="flex items-center">
                                                        <div
                                                            className={'flex h-8 w-8 items-center justify-center rounded-full'}
                                                        >
                                           <span className={'text-xl flex-shrink-0'}>
                                             {mood.icon}
                                           </span>
                                                        </div>
                                                        <span
                                                            className="ml-3 block truncate font-medium">{mood.name}</span>
                                                    </div>
                                                </Listbox.Option>
                                            ))}
                                        </Listbox.Options>
                                    </Transition>
                                </div>
                            </>
                        )}
                    </Listbox>
                </div>
            </div>
            <div className="flex-shrink-0 flex  items-center gap-8 pb-2">
                <div className={'flex gap-4'}>
                    <Switch defaultChecked={isPublic} onChange={(value) => setIsPublic(value)}
                            className={`
                                    ${isPublic ? 'bg-orange-600' : 'bg-gray-200 dark:bg-slate-600'}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-orange-600 focus:ring-offset-2`}
                    >
                        <span className="sr-only">Use setting</span>
                        <span
                            aria-hidden="true"
                            className={`
                                        ${isPublic ? 'translate-x-5' : 'translate-x-0'}
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    `}
                        />
                    </Switch>
                    Öffentlich posten
                </div>


                <IconButton loading={loading}>
                    Post
                </IconButton>
            </div>
        </div>
    </form>

}