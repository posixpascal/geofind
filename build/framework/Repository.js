export class Repository {
    constructor(_storage, Type) {
        this._storage = _storage;
        this.Type = Type;
    }
    save(T, expectedVersion) {
        this._storage.saveEvents(T.id, T.getUncommittedChanges(), expectedVersion);
        T.markChangesAsCommitted();
    }
    getById(id) {
        const domainObject = new this.Type();
        const history = this._storage.getEventsForAggregate(id);
        domainObject.loadFromHistory(history);
        return domainObject;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJmcmFtZXdvcmsvUmVwb3NpdG9yeS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxNQUFNLE9BQU8sVUFBVTtJQUNyQixZQUNtQixRQUFxQixFQUM5QixJQUFpQjtRQURSLGFBQVEsR0FBUixRQUFRLENBQWE7UUFDOUIsU0FBSSxHQUFKLElBQUksQ0FBYTtJQUN4QixDQUFDO0lBRUosSUFBSSxDQUFDLENBQUMsRUFBRSxlQUF1QjtRQUM3QixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLGVBQWUsQ0FBQyxDQUFBO1FBQzFFLENBQUMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFBO0lBQzVCLENBQUM7SUFFRCxPQUFPLENBQUMsRUFBVTtRQUNoQixNQUFNLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxJQUFJLEVBQU8sQ0FBQTtRQUN6QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZELFlBQVksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUE7UUFDckMsT0FBTyxZQUFZLENBQUE7SUFDckIsQ0FBQztDQUNGIn0=