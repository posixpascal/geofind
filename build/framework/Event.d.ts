import { IMessage } from './IMessage';
export declare class Event implements IMessage {
    readonly aggregateId: string;
    constructor(aggregateId: string);
}
