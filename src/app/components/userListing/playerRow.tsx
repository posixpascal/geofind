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

export const PlayerRow = ({player, onColorChange, room}) => {
    const audioMuted = !!localStorage.getItem("audioMuted");
    const [colorPicker, toggleColorPicker] = useState(false);
    const [muted, setMuted] = useState(audioMuted);

    const isLeader = isRoomLeader(room);
    const userIcon = isLeader ? <Zap/> : <User/>;

    const colorPickerComponent = (
        <UserColorPicker
            onColorChange={onColorChange}
            player={player}
            toggleColorPicker={toggleColorPicker}
        />
    );

    const toggleMute = () => {
        if (audioMuted) {
            localStorage.removeItem("audioMuted");
        }

        if (!audioMuted) {
            localStorage.setItem("audioMuted", "1");
        }

        return setMuted(!audioMuted);
    };

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
