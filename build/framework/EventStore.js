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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXZlbnRTdG9yZS5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJmcmFtZXdvcmsvRXZlbnRTdG9yZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUMseUJBQXlCLEVBQUMsTUFBTSxVQUFVLENBQUE7QUFFbEQsTUFBTSxlQUFlO0lBQ25CLFlBQ2tCLFdBQW1CLEVBQ25CLEtBQVksRUFDWixPQUFlO1FBRmYsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFDbkIsVUFBSyxHQUFMLEtBQUssQ0FBTztRQUNaLFlBQU8sR0FBUCxPQUFPLENBQVE7SUFDOUIsQ0FBQztDQUNMO0FBRUQsTUFBTSxPQUFPLFVBQVU7SUFHckIsWUFBb0IsVUFBdUI7UUFBdkIsZUFBVSxHQUFWLFVBQVUsQ0FBYTtRQUYzQyxXQUFNLEdBQUcsRUFBRSxDQUFBO0lBRW1DLENBQUM7SUFFL0MscUJBQXFCLENBQUMsV0FBbUI7UUFDdkMsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsQ0FDakMsQ0FBQyxlQUFlLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQzNDLENBQUE7SUFDSCxDQUFDO0lBRUQsVUFBVSxDQUNSLFdBQW1CLEVBQ25CLFNBQWtCLEVBQ2xCLHdCQUFnQztRQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUM3QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEVBQUUsQ0FBQTtTQUM5QjtRQUVELE1BQU0sbUJBQW1CLEdBQUcsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3BFLElBQ0UsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQztZQUNuQyxtQkFBbUIsQ0FBQyxPQUFPLEtBQUssd0JBQXdCLEVBQ3hEO1lBQ0EsTUFBTSxJQUFJLHlCQUF5QixDQUNqQywyRUFBMkUsQ0FDNUUsQ0FBQTtTQUNGO1FBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1FBQ1QsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVksRUFBRSxFQUFFO1lBQ2pDLENBQUMsSUFBSSxDQUFDLENBQUE7WUFDTixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLGVBQWUsQ0FBQyxXQUFXLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDM0UsQ0FBQyxDQUFDLENBQUE7UUFFRixJQUFJLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3pCLENBQUM7SUFFTyxzQkFBc0IsQ0FBQyxXQUFtQjtRQUNoRCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUE7SUFDdEUsQ0FBQztJQUVPLE9BQU8sQ0FBQyxNQUFlO1FBQzdCLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFZLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDbEUsQ0FBQztDQUNGIn0=