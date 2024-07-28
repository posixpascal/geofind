import { IEventStore } from './IEventStore';
import { AggregateRoot } from './AggregateRoot';
export interface IRepository<T extends AggregateRoot> {
    save(T: any, expectedVersion: number): void;
    getById(id: string): T;
}
export declare class Repository<T extends AggregateRoot> implements IRepository<T> {
    private readonly _storage;
    private Type;
    constructor(_storage: IEventStore, Type: new () => T);
    save(T: any, expectedVersion: number): void;
    getById(id: string): T;
}
