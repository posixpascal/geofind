import {Dialog as DialogUI, Transition} from "@headlessui/react";
import React, {Fragment, ReactNode} from "react";

// TODO: add react-spring as animation driver here.

interface DialogProps {
    title?: string;
    children: ReactNode;
    setOpen: (value: boolean) => void,
    open: boolean;
}

export const Dialog: React.FC<DialogProps> = ({title, children, setOpen, open}) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <DialogUI as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"/>
                </Transition.Child>

                <div className="fixed w-full inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogUI.Panel
                                className="relative transform rounded-lg bg-card px-4 pb-4 pt-5 text-left shadow-xl transition-all w-full sm:my-8 sm:w-full sm:max-w-sm md:max-w-md lg:max-w-lg sm:p-6">
                                <div className={'text-card-headline'}>{title}</div>
                                <div className={'text-card-paragraph'}>
                                    {children}
                                </div>
                            </DialogUI.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </DialogUI>
        </Transition.Root>
    );
};
