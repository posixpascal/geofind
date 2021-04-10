import React, {useEffect, useRef} from "react";
import {FancyDialog, FancyDialogFooter, FancyDialogContent, FancyDialogHeader} from "./index";
import {FancyInput} from "../form/input";
import {TextButton} from "../buttons";

export const ChangeNameDialog = ({visible, user, changeName, onClose}) => {
    const input: any = useRef();

    useEffect(() => {
        if (input.current) {
            input.current.focus();
        }
    });

    const saveName = () => {
        changeName(input.current.value)
    };

    return <div>
        <FancyDialog inline={true} visible={visible}>
            <FancyDialogContent>
                <FancyDialogHeader onClose={onClose} variant={"yellow"}>
                    Enter a new name
                </FancyDialogHeader>
                <FancyInput ref={input} autofocus={true} defaultValue={user.displayName}/>
                <FancyDialogFooter><TextButton title="Save" onClick={saveName} variant="green" /></FancyDialogFooter>
            </FancyDialogContent>
        </FancyDialog>
    </div>
};
