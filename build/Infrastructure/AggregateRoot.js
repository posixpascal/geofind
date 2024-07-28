export class AggregateRoot {
    constructor() {
        this._changes = [];
    }
    get id() {
        return this._id;
    }
    getUncommittedChanges() {
        return this._changes;
    }
    markChangesAsCommitted() {
        this._changes.length = 0;
    }
    loadFromHistory(history) {
        history.forEach((event) => {
            this.applyChangeInternal(event, false);
        });
    }
    applyChange(event) {
        this.applyChangeInternal(event, true);
    }
    applyChangeInternal(event, isNew = false) {
        if (!this[`apply${event.constructor.name}`]) {
            throw new Error(`No handler found for ${event.constructor.name}. Be sure to define a method called apply${event.constructor.name} on the aggregate.`);
        }
        this[`apply${event.constructor.name}`](event);
        this._version += 1;
        if (isNew) {
            this._changes.push(event);
        }
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlUm9vdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJJbmZyYXN0cnVjdHVyZS9BZ2dyZWdhdGVSb290LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBLE1BQU0sT0FBZ0IsYUFBYTtJQUFuQztRQUNVLGFBQVEsR0FBWSxFQUFFLENBQUE7SUF5Q2hDLENBQUM7SUF0Q0MsSUFBSSxFQUFFO1FBQ0osT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFBO0lBQ2pCLENBQUM7SUFJTSxxQkFBcUI7UUFDMUIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFBO0lBQ3RCLENBQUM7SUFFRCxzQkFBc0I7UUFDcEIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFBO0lBQzFCLENBQUM7SUFFRCxlQUFlLENBQUMsT0FBZ0I7UUFDOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUE7UUFDeEMsQ0FBQyxDQUFDLENBQUE7SUFDSixDQUFDO0lBRVMsV0FBVyxDQUFDLEtBQVk7UUFDaEMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0lBRU8sbUJBQW1CLENBQUMsS0FBWSxFQUFFLEtBQUssR0FBRyxLQUFLO1FBQ3JELElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUU7WUFDM0MsTUFBTSxJQUFJLEtBQUssQ0FDYix3QkFBd0IsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLDRDQUE0QyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksb0JBQW9CLENBQ3JJLENBQUE7U0FDRjtRQUVELElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUM3QyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsQ0FBQTtRQUVsQixJQUFJLEtBQUssRUFBRTtZQUNULElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFBO1NBQzFCO0lBQ0gsQ0FBQztDQUNGIn0=