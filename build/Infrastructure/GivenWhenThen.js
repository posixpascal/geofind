import { MessageBus } from './MessageBus';
import { EventStore } from './EventStore';
import { Repository } from './Repository';
export function GivenWhenThen(aggregatePath) {
    return (cb) => {
        const dir = aggregatePath.substring(0, aggregatePath.lastIndexOf('/'));
        function req(moduleName, extract = false) {
            if (extract)
                return require(`${dir}/${moduleName}`)[`${moduleName}`];
            return require(`${dir}/${moduleName}`);
        }
        const aggregateName = aggregatePath.substring(aggregatePath.lastIndexOf('/') + 1);
        const Aggregate = req(aggregateName, true);
        const AggregateCommandHandlers = req(`${aggregateName}CommandHandlers`, true);
        const AggregateCommands = require(`${dir}/${aggregateName}Commands`);
        const messageBus = new MessageBus();
        const eventStore = new EventStore(messageBus);
        const repository = new Repository(eventStore, Aggregate);
        messageBus.registerCommandHandlers(AggregateCommands, new AggregateCommandHandlers(repository));
        function Given(...events) {
            events.forEach((event) => {
                eventStore.saveEvents(event.aggregateId, [event], 1);
            });
        }
        let whenCallback;
        function When(...commands) {
            whenCallback = () => {
                commands.forEach((command) => messageBus.send(command));
            };
        }
        function Then(...expectedEvents) {
            expectedEvents.forEach((expectedEvent) => {
                messageBus.registerEventHandler(expectedEvent.constructor, (actualEvent) => {
                    expect(actualEvent).toEqual(expectedEvent);
                });
            });
            whenCallback();
        }
        return cb(Given, When, Then, messageBus);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZW5XaGVuVGhlbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJJbmZyYXN0cnVjdHVyZS9HaXZlbldoZW5UaGVuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUN2QyxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBRXZDLE1BQU0sVUFBVSxhQUFhLENBQUMsYUFBcUI7SUFDakQsT0FBTyxDQUFDLEVBQVksRUFBWSxFQUFFO1FBQ2hDLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQTtRQUV0RSxTQUFTLEdBQUcsQ0FBQyxVQUFVLEVBQUUsT0FBTyxHQUFHLEtBQUs7WUFDdEMsSUFBSSxPQUFPO2dCQUVULE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUMsR0FBRyxVQUFVLEVBQUUsQ0FBQyxDQUFBO1lBRXpELE9BQU8sT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUE7UUFDeEMsQ0FBQztRQUlELE1BQU0sYUFBYSxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQzNDLGFBQWEsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUNuQyxDQUFBO1FBRUQsTUFBTSxTQUFTLEdBQUcsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsQ0FBQTtRQUMxQyxNQUFNLHdCQUF3QixHQUFHLEdBQUcsQ0FDbEMsR0FBRyxhQUFhLGlCQUFpQixFQUNqQyxJQUFJLENBQ0wsQ0FBQTtRQUVELE1BQU0saUJBQWlCLEdBQUcsT0FBTyxDQUFDLEdBQUcsR0FBRyxJQUFJLGFBQWEsVUFBVSxDQUFDLENBQUE7UUFFcEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQTtRQUNuQyxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQTtRQUM3QyxNQUFNLFVBQVUsR0FBRyxJQUFJLFVBQVUsQ0FBQyxVQUFVLEVBQUUsU0FBUyxDQUFDLENBQUE7UUFFeEQsVUFBVSxDQUFDLHVCQUF1QixDQUNoQyxpQkFBaUIsRUFDakIsSUFBSSx3QkFBd0IsQ0FBQyxVQUFVLENBQUMsQ0FDekMsQ0FBQTtRQUVELFNBQVMsS0FBSyxDQUFDLEdBQUcsTUFBZTtZQUMvQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7Z0JBQ3ZCLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFBO1lBQ3RELENBQUMsQ0FBQyxDQUFBO1FBQ0osQ0FBQztRQUVELElBQUksWUFBWSxDQUFBO1FBRWhCLFNBQVMsSUFBSSxDQUFDLEdBQUcsUUFBbUI7WUFDbEMsWUFBWSxHQUFHLEdBQVMsRUFBRTtnQkFDeEIsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFBO1lBQ3pELENBQUMsQ0FBQTtRQUNILENBQUM7UUFFRCxTQUFTLElBQUksQ0FBQyxHQUFHLGNBQXVCO1lBQ3RDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxhQUFhLEVBQUUsRUFBRTtnQkFDdkMsVUFBVSxDQUFDLG9CQUFvQixDQUM3QixhQUFhLENBQUMsV0FBVyxFQUN6QixDQUFDLFdBQVcsRUFBRSxFQUFFO29CQUNkLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzVDLENBQUMsQ0FDRixDQUFBO1lBQ0gsQ0FBQyxDQUFDLENBQUE7WUFDRixZQUFZLEVBQUUsQ0FBQTtRQUNoQixDQUFDO1FBRUQsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUE7SUFDMUMsQ0FBQyxDQUFBO0FBQ0gsQ0FBQyJ9