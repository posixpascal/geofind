interface SocketResource {
    onMessage: Function;
    removeAllListeners: Function;
    send: Function;
    onStateChange: Function;
    leave: Function;
    listenerAttached:boolean;
}

declare global {
    interface Window {
        isJoining?: boolean;
        currentRoom: SocketResource;
        currentGame: SocketResource;
    }
}

export {};