import React, { useEffect } from "react";
import useForm from "react-hook-form";
import {Content} from "../../components/uiWidgets/Content";
import {strings} from "../../i18n";
import {webSocketConnection} from "../../helper/webSockets";
import {Loading} from "../../components/loading";

export const LobbyCreatePage = (props) => {
    const { handleSubmit, register, errors } = useForm();
    const onSubmit = values => {
    };
    webSocketConnection.emit("createLobby", { title: strings.newLobbyName });

    return (
        <div>
            <Loading />
        </div>
    );
};
