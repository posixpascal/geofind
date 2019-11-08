import React, {useEffect, useRef} from "react";
import {FancyDialog, FancyDialogContent, FancyDialogHeader} from "./index";
import {FancyInput} from "../form/input";

export const ChangeNameDialog = ({visible, user}) => {
    const input : any = useRef();

    useEffect(() => {
        if (input.current){
            input.current.focus();
        }
    });

    return <div>
        <FancyDialog inline={true} visible={visible}>
            <FancyDialogContent>
                <FancyDialogHeader variant={"yellow"}>
                    Enter a new name
                </FancyDialogHeader>
                <FancyInput ref={input} autofocus={true} defaultValue={user.displayName}></FancyInput>

            </FancyDialogContent>
        </FancyDialog>
    </div>
};
