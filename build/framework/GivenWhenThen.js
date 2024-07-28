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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2l2ZW5XaGVuVGhlbi5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJmcmFtZXdvcmsvR2l2ZW5XaGVuVGhlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHQSxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sY0FBYyxDQUFBO0FBQ3ZDLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxjQUFjLENBQUE7QUFDdkMsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGNBQWMsQ0FBQTtBQUV2QyxNQUFNLFVBQVUsYUFBYSxDQUFDLGFBQXFCO0lBQ2pELE9BQU8sQ0FBQyxFQUFZLEVBQVksRUFBRTtRQUNoQyxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUE7UUFFdEUsU0FBUyxHQUFHLENBQUMsVUFBVSxFQUFFLE9BQU8sR0FBRyxLQUFLO1lBQ3RDLElBQUksT0FBTztnQkFFVCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFDLEdBQUcsVUFBVSxFQUFFLENBQUMsQ0FBQTtZQUV6RCxPQUFPLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyxDQUFBO1FBQ3hDLENBQUM7UUFJRCxNQUFNLGFBQWEsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUMzQyxhQUFhLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FDbkMsQ0FBQTtRQUVELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLENBQUE7UUFDMUMsTUFBTSx3QkFBd0IsR0FBRyxHQUFHLENBQ2xDLEdBQUcsYUFBYSxpQkFBaUIsRUFDakMsSUFBSSxDQUNMLENBQUE7UUFFRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLEdBQUcsSUFBSSxhQUFhLFVBQVUsQ0FBQyxDQUFBO1FBRXBFLE1BQU0sVUFBVSxHQUFHLElBQUksVUFBVSxFQUFFLENBQUE7UUFDbkMsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUE7UUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFBO1FBRXhELFVBQVUsQ0FBQyx1QkFBdUIsQ0FDaEMsaUJBQWlCLEVBQ2pCLElBQUksd0JBQXdCLENBQUMsVUFBVSxDQUFDLENBQ3pDLENBQUE7UUFFRCxTQUFTLEtBQUssQ0FBQyxHQUFHLE1BQWU7WUFDL0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxFQUFFO2dCQUN2QixVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQTtZQUN0RCxDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxJQUFJLFlBQVksQ0FBQTtRQUVoQixTQUFTLElBQUksQ0FBQyxHQUFHLFFBQW1CO1lBQ2xDLFlBQVksR0FBRyxHQUFTLEVBQUU7Z0JBQ3hCLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQTtZQUN6RCxDQUFDLENBQUE7UUFDSCxDQUFDO1FBRUQsU0FBUyxJQUFJLENBQUMsR0FBRyxjQUF1QjtZQUN0QyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUMsYUFBYSxFQUFFLEVBQUU7Z0JBQ3ZDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FDN0IsYUFBYSxDQUFDLFdBQVcsRUFDekIsQ0FBQyxXQUFXLEVBQUUsRUFBRTtvQkFDZCxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUM1QyxDQUFDLENBQ0YsQ0FBQTtZQUNILENBQUMsQ0FBQyxDQUFBO1lBQ0YsWUFBWSxFQUFFLENBQUE7UUFDaEIsQ0FBQztRQUVELE9BQU8sRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFBO0lBQzFDLENBQUMsQ0FBQTtBQUNILENBQUMifQ==