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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVwb3NpdG9yeS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJJbmZyYXN0cnVjdHVyZS9SZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQVFBLE1BQU0sT0FBTyxVQUFVO0lBQ3JCLFlBQ21CLFFBQXFCLEVBQzlCLElBQWlCO1FBRFIsYUFBUSxHQUFSLFFBQVEsQ0FBYTtRQUM5QixTQUFJLEdBQUosSUFBSSxDQUFhO0lBQ3hCLENBQUM7SUFFSixJQUFJLENBQUMsQ0FBQyxFQUFFLGVBQXVCO1FBQzdCLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLHFCQUFxQixFQUFFLEVBQUUsZUFBZSxDQUFDLENBQUE7UUFDMUUsQ0FBQyxDQUFDLHNCQUFzQixFQUFFLENBQUE7SUFDNUIsQ0FBQztJQUVELE9BQU8sQ0FBQyxFQUFVO1FBQ2hCLE1BQU0sWUFBWSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksRUFBTyxDQUFBO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkQsWUFBWSxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNyQyxPQUFPLFlBQVksQ0FBQTtJQUNyQixDQUFDO0NBQ0YifQ==