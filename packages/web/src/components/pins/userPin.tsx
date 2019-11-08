import * as React from "react";
import {PushPin} from "../../helper/svgs";

export const UserPin = ({user}) => {
    return (
        <PushPin pinned={true} size={24} color={user.metadata.pin_color} />
    )
};
