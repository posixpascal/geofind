import { IMessageBus } from './IMessageBus';
import { IMessage } from './IMessage';
import { Command } from './Command';
import { Event } from './Event';
export declare class MessageBus implements IMessageBus {
    private _eventHandlerFor;
    private _commandHandlersFor;
    registerEventHandler<T extends Event>(event: any, handler: (e: IMessage) => void): void;
    registerCommandHandlers(commands: any, commandHandler: any): void;
    send<T extends Command>(command: T): void;
    publish<T extends Event>(event: T): void;
}
