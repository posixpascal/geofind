import React from "react";
import styled from "styled-components";

import {strings} from "../../i18n";

const RoomInvitationWrapper = styled.div`
  margin-top: 40px;
`;

const RoomInvitationCopy = styled.code`
  word-break: break-all;
  white-space: normal;
`;

export const RoomInvitationLink = () => {
    const invitationLink = window.location.href;

    return <RoomInvitationWrapper>
        <div>{strings.inviteTip}</div>
        <RoomInvitationCopy>{invitationLink}</RoomInvitationCopy>
    </RoomInvitationWrapper>;
};
