import { IMessage } from './IMessage';
export declare class Command implements IMessage {
    readonly expectedAggregateVersion: number;
    constructor(expectedAggregateVersion: number);
}
