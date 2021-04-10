import React from "react";
import {TwitterPicker} from "react-color";
import {client} from "../../helper/webSockets";

export const UserColorPicker = ({player, onColorChange, toggleColorPicker}) => {
    const hideColorPicker = () => toggleColorPicker(false);
    const popover: any = {
        left: "-8px",
        position: "absolute",
        top: "25px",
        zIndex: "2",
    };

    const cover: any = {
        bottom: "0px",
        left: "0px",
        position: "fixed",
        right: "0px",
        top: "0px",

    };

    if (client.auth._id !== player.id) {
        return null;
    }
    return (
        <div style={popover}>
            <div style={cover} onClick={hideColorPicker}/>
            <TwitterPicker onChangeComplete={onColorChange}/>
        </div>
    );
};
