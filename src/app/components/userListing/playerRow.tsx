import React, {useState} from "react";
import {User, Zap} from "react-feather";
import {client} from "../../helper/webSockets";
import {isRoomLeader} from "../../shared/selectors";
import {UserName} from "../game/scoreBoard/widgets";
import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {GetReadyButton, MuteButton, PlayerStatusButton} from "./buttons";
import {UserColorPicker} from "./colorPicker";
import {changeName} from "./index";
import {ColorPickerWrapper, UserColor, UserIcon, UserListingRow} from "./widgets";

export const PlayerRow = ({player, room}) => {
    const [colorPicker, toggleColorPicker] = useState(false);
    const [muted, setMuted] = useState(!!localStorage.getItem("audioMuted"));

    const toggleMute = () => {
        if (localStorage.getItem("audioMuted")) {
            localStorage.removeItem("audioMuted");
            setMuted(false);
        } else {
            localStorage.setItem("audioMuted", "1");
            setMuted(true);
        }
    };

    const onColorChange = (color) => {
        window.currentRoom.send({type: "user:color:set", payload: color});
    };

    const isLeader = isRoomLeader(room);

    const userIcon = isLeader ? <Zap/> : <User/>;
    const handleUserNameClick = () => {
        if (client.auth._id !== player.id) {
            return;
        }
        changeName();
    };

    const handleUserColorClick = () => {
        if (client.auth._id !== player.id) {
            return;
        }
        toggleColorPicker(!colorPicker);
    };

    const colorPickerComponent = (
        <UserColorPicker
            onColorChange={onColorChange}
            player={player}
            toggleColorPicker={toggleColorPicker}
        />
    );

    return (
        <UserListingRow isUser={client.auth._id === player.id} key={player.id}>
            <HorizontalAlignment>
                <UserIcon className={"userIcon"}>{userIcon}</UserIcon>
                <UserName onClick={handleUserNameClick}>
                    <img alt="Player avatar" src={player.avatarUrl} width={28}/>
                    {player.displayName}
                </UserName>
                <ColorPickerWrapper>
                    <UserColor onClick={handleUserColorClick} style={{background: player.color}}/>
                    {colorPicker && colorPickerComponent}
                </ColorPickerWrapper>
            </HorizontalAlignment>
            <HorizontalAlignment>
                {client.auth._id === player.id && <MuteButton muted={muted} toggleMute={toggleMute}/>}
                {client.auth._id === player.id ? GetReadyButton : PlayerStatusButton}
            </HorizontalAlignment>
        </UserListingRow>
    );
};
