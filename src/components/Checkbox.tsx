import {Switch} from "@headlessui/react";
import React, {useEffect, useState} from "react";

interface CheckboxProps {
    defaultChecked?: boolean;
    onChange: (state: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({defaultChecked = false, onChange}) => {
    const [checked, setChecked] = useState<boolean>(defaultChecked);

    useEffect(() => {
        onChange(checked);
    }, [checked, onChange]);

    return <div className={'items-center flex gap-2 ml-4'}>
                            <span className={'text-card-paragraph'}>
                                {checked ? "An" : "Aus"}
                            </span>
        <Switch
            defaultChecked={defaultChecked}
            onClick={(e) => setChecked(!checked)}
            className={`
                                    ${checked ? 'bg-tertiary' : 'bg-background'}
                                    relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 
                                    border-transparent transition-colors duration-200 ease-in-out focus:outline-none 
                                    focus:ring-2 focus:ring-button focus:ring-offset-2`}
        >
            <span className="sr-only">Use setting</span>
            <span
                aria-hidden="true"
                className={`
                                        ${checked ? 'translate-x-5' : 'translate-x-0'}
                                        pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out
                                    `}
            />
        </Switch>
    </div>
}