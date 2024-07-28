import { IMessage } from './IMessage';
import { Command } from './Command';
import { Event } from './Event';
export interface IMessageBus {
    registerEventHandler<T extends Event>(event: any, handler: (e: IMessage) => void): void;
    registerCommandHandlers(commands: any, handlers: any): void;
    send<T extends Command>(command: T): void;
    publish<T extends Event>(event: T): void;
}
