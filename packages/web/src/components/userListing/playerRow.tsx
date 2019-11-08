import React, {useState} from "react";
import {Eye, MessageCircle, Settings, User, UserPlus, Zap} from "react-feather";
import {client} from "../../helper/webSockets";
import {isRoomLeader} from "../../shared/selectors";

import {HorizontalAlignment} from "../uiWidgets/HorizontalAlignment";
import {GetReadyButton, MuteButton, PlayerStatusButton} from "./buttons";
import {UserColorPicker} from "./colorPicker";
import {changeName} from "./index";
import {ColorPickerWrapper, UserColor, UserName, UserActions, UserIcon, UserListingRow} from "./widgets";

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
        <UserListingRow key={player.id}>
                <UserName borderColor={player.color} onClick={handleUserNameClick}>
                    <img alt="Player avatar" src={player.avatarUrl} width={28}/>
                    <span>
                    {player.displayName}
                        {/*<UserIcon className={"userIcon"}>{userIcon}</UserIcon>*/}
                </span>
                </UserName>
            <UserActions>
                {isCurrentPlayer && <MessageCircle/>}
                {!isCurrentPlayer && <UserPlus />}
            </UserActions>
            {/*<ColorPickerWrapper>
                    <UserColor onClick={handleUserColorClick} style={{background: player.color}}/>
                    {colorPicker && colorPickerComponent}
                </ColorPickerWrapper>*/}
            {/*<HorizontalAlignment>
                {isCurrentPlayer && <MuteButton muted={muted} toggleMute={toggleMute}/>}
                {isCurrentPlayer && <GetReadyButton player={player} />}
                {!isCurrentPlayer && <PlayerStatusButton player={player} room={room} />}
            </HorizontalAlignment>*/}
        </UserListingRow>
    );
};
