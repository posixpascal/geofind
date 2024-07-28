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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWdncmVnYXRlUm9vdC5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJmcmFtZXdvcmsvQWdncmVnYXRlUm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQSxNQUFNLE9BQWdCLGFBQWE7SUFBbkM7UUFDVSxhQUFRLEdBQVksRUFBRSxDQUFBO0lBeUNoQyxDQUFDO0lBdENDLElBQUksRUFBRTtRQUNKLE9BQU8sSUFBSSxDQUFDLEdBQUcsQ0FBQTtJQUNqQixDQUFDO0lBSU0scUJBQXFCO1FBQzFCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQTtJQUN0QixDQUFDO0lBRUQsc0JBQXNCO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQTtJQUMxQixDQUFDO0lBRUQsZUFBZSxDQUFDLE9BQWdCO1FBQzlCLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTtZQUN4QixJQUFJLENBQUMsbUJBQW1CLENBQUMsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFBO1FBQ3hDLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVTLFdBQVcsQ0FBQyxLQUFZO1FBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFDdkMsQ0FBQztJQUVPLG1CQUFtQixDQUFDLEtBQVksRUFBRSxLQUFLLEdBQUcsS0FBSztRQUNyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFO1lBQzNDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0JBQXdCLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSw0Q0FBNEMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLG9CQUFvQixDQUNySSxDQUFBO1NBQ0Y7UUFFRCxJQUFJLENBQUMsUUFBUSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDN0MsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUE7UUFFbEIsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQTtTQUMxQjtJQUNILENBQUM7Q0FDRiJ9