import React from "react";
import {strings} from "../../../../i18n";
import {Loader} from "react-feather";

export const GameLoadingOverlay = () => {
    return <div>
        <p>{strings.gameLoading}</p>
        <div className={"loader"}>
            <Loader/>
        </div>
    </div>;
};
