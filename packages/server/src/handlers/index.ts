import {Client, Room} from "colyseus";

const registeredCommands: any = {};

export interface IMessage {
    type: string;
    payload?: any;
}

/**
 *
 */
export class Handler {

    public static handleMessage(room: Room & { handlers: any }, client: Client, message: IMessage) {
        if (registeredCommands[message.type]) {
            registeredCommands[message.type].bind({room})(client, message.payload);
            return true;
        }
        return false;
    }
    public room: Room & { handlers: any };

    constructor(room: any) {
        this.room = room;
    }
}

/**
 * @description
 * Decorator to simplify handling of messages sent by the browser.
 * use in a handler class like this:
 *
 * class MyHandler {
 *     @handle("event_name")
 *     code(client, <messagePayload>){}
 * }
 *
 * The room instance is accessible using `this.room`.
 * @param message
 */
export const handle = (message: string) => {
    return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
        registeredCommands[message] = descriptor.value;
    };
};
