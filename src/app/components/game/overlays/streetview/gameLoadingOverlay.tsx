import React from "react";
import {Loader} from "react-feather";
import {strings} from "../../../../i18n";

export const GameLoadingOverlay = () => {
    return (
        <div>
            <p>{strings.gameLoading}</p>
            <div className={"loader"}>
                <Loader/>
            </div>
        </div>
    );
};
