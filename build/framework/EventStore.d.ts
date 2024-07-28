import { IEventStore } from './IEventStore';
import { IMessageBus } from './IMessageBus';
import { Event } from './Event';
export declare class EventStore implements IEventStore {
    private messageBus;
    events: {};
    constructor(messageBus: IMessageBus);
    getEventsForAggregate(aggregateId: string): Event[];
    saveEvents(aggregateId: string, newEvents: Event[], expectedAggregateVersion: number): void;
    private getLastEventDescriptor;
    private publish;
}
