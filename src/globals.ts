interface ISocketResource {
    onMessage: (cb) => void;
    removeAllListeners: () => void;
    send: (data) => void;
    onStateChange: (cb) => void;
    leave: (room) => void;
    listenerAttached: boolean;
}

declare global {
    // tslint:disable-next-line:interface-name
    interface Window {
        isJoining?: boolean;
        currentRoom: ISocketResource;
        currentGame: ISocketResource;
    }
}

export {};
