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
    const audioMuted = localStorage.getItem("audioMuted") !== null;
    const [colorPicker, toggleColorPicker] = useState(false);
    const [muted, setMuted] = useState(audioMuted);

    const isLeader = isRoomLeader(room);
    const userIcon = isLeader ? <Zap/> : <User/>;
    const isCurrentPlayer = client.auth._id === player.id;

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
        if (!isCurrentPlayer) {
            return;
        }
        changeName();
    };

    const handleUserColorClick = () => {
        if (!isCurrentPlayer) {
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
                {isCurrentPlayer && <MuteButton muted={muted} toggleMute={toggleMute}/>}
                {isCurrentPlayer ? GetReadyButton : PlayerStatusButton}
            </HorizontalAlignment>
        </UserListingRow>
    );
};
