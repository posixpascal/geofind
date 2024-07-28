import { Event } from './Event';
export declare abstract class AggregateRoot {
    private _changes;
    protected _id: string;
    get id(): string;
    private _version;
    getUncommittedChanges(): Event[];
    markChangesAsCommitted(): void;
    loadFromHistory(history: Event[]): void;
    protected applyChange(event: Event): void;
    private applyChangeInternal;
}
