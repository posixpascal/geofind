import { ConcurrencyViolationError } from './Errors';
class EventDescriptor {
    constructor(aggregateId, event, version) {
        this.aggregateId = aggregateId;
        this.event = event;
        this.version = version;
    }
}
export class EventStore {
    constructor(messageBus) {
        this.messageBus = messageBus;
        this.events = {};
    }
    getEventsForAggregate(aggregateId) {
        return this.events[aggregateId].map((eventDescriptor) => eventDescriptor.event);
    }
    saveEvents(aggregateId, newEvents, expectedAggregateVersion) {
        if (!this.events[aggregateId]) {
            this.events[aggregateId] = [];
        }
        const lastEventDescriptor = this.getLastEventDescriptor(aggregateId);
        if (this.events[aggregateId].length > 0 &&
            lastEventDescriptor.version !== expectedAggregateVersion) {
            throw new ConcurrencyViolationError('An operation has been performed on an aggregate root that is out of date.');
        }
        let i = 0;
        newEvents.forEach((event) => {
            i += 1;
            this.events[aggregateId].push(new EventDescriptor(aggregateId, event, i));
        });
        this.publish(newEvents);
    }
    getLastEventDescriptor(aggregateId) {
        return this.events[aggregateId][this.events[aggregateId].length - 1];
    }
    publish(events) {
        events.forEach((event) => this.messageBus.publish(event));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJJbmZyYXN0cnVjdHVyZS9FdmVudFN0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLFVBQVUsQ0FBQTtBQUVsRCxNQUFNLGVBQWU7SUFDbkIsWUFDa0IsV0FBbUIsRUFDbkIsS0FBWSxFQUNaLE9BQWU7UUFGZixnQkFBVyxHQUFYLFdBQVcsQ0FBUTtRQUNuQixVQUFLLEdBQUwsS0FBSyxDQUFPO1FBQ1osWUFBTyxHQUFQLE9BQU8sQ0FBUTtJQUM5QixDQUFDO0NBQ0w7QUFFRCxNQUFNLE9BQU8sVUFBVTtJQUdyQixZQUFvQixVQUF1QjtRQUF2QixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBRjNDLFdBQU0sR0FBRyxFQUFFLENBQUE7SUFFbUMsQ0FBQztJQUUvQyxxQkFBcUIsQ0FBQyxXQUFtQjtRQUN2QyxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsR0FBRyxDQUNqQyxDQUFDLGVBQWUsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FDM0MsQ0FBQTtJQUNILENBQUM7SUFFRCxVQUFVLENBQ1IsV0FBbUIsRUFDbkIsU0FBa0IsRUFDbEIsd0JBQWdDO1FBRWhDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzdCLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFBO1NBQzlCO1FBRUQsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxDQUFDLENBQUE7UUFDcEUsSUFDRSxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO1lBQ25DLG1CQUFtQixDQUFDLE9BQU8sS0FBSyx3QkFBd0IsRUFDeEQ7WUFDQSxNQUFNLElBQUkseUJBQXlCLENBQ2pDLDJFQUEyRSxDQUM1RSxDQUFBO1NBQ0Y7UUFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDVCxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBWSxFQUFFLEVBQUU7WUFDakMsQ0FBQyxJQUFJLENBQUMsQ0FBQTtZQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksZUFBZSxDQUFDLFdBQVcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUMzRSxDQUFDLENBQUMsQ0FBQTtRQUVGLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDekIsQ0FBQztJQUVPLHNCQUFzQixDQUFDLFdBQW1CO1FBQ2hELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQTtJQUN0RSxDQUFDO0lBRU8sT0FBTyxDQUFDLE1BQWU7UUFDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQTtJQUNsRSxDQUFDO0NBQ0YifQ==