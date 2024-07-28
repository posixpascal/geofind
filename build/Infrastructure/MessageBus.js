export class MessageBus {
    constructor() {
        this._eventHandlerFor = {};
        this._commandHandlersFor = {};
    }
    registerEventHandler(event, handler) {
        if (!this._eventHandlerFor[event.name])
            this._eventHandlerFor[event.name] = [];
        this._eventHandlerFor[event.name].push(handler);
    }
    registerCommandHandlers(commands, commandHandler) {
        Object.keys(commands).forEach((commandName) => {
            if (!commandHandler[`handle${commandName}`])
                throw new Error(`Could not find handle${commandName} in ${commandHandler.constructor.name}.`);
            this._commandHandlersFor[commandName] = commandHandler;
        });
    }
    send(command) {
        const commandName = command.constructor.name;
        if (!this._commandHandlersFor[commandName])
            throw new Error(`No handler registered for ${commandName}`);
        this._commandHandlersFor[commandName][`handle${commandName}`](command);
    }
    publish(event) {
        const eventName = event.constructor.name;
        if (this._eventHandlerFor[eventName])
            this._eventHandlerFor[eventName].forEach((handler) => handler(event));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUJ1cy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJJbmZyYXN0cnVjdHVyZS9NZXNzYWdlQnVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUtBLE1BQU0sT0FBTyxVQUFVO0lBQXZCO1FBQ1UscUJBQWdCLEdBQUcsRUFBRSxDQUFBO1FBQ3JCLHdCQUFtQixHQUFHLEVBQUUsQ0FBQTtJQXdDbEMsQ0FBQztJQXRDQyxvQkFBb0IsQ0FFbEIsS0FBVSxFQUNWLE9BQThCO1FBRTlCLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUNwQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQTtRQUN4QyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQTtJQUNqRCxDQUFDO0lBRUQsdUJBQXVCLENBRXJCLFFBQWEsRUFFYixjQUFtQjtRQUVuQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQzVDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxXQUFXLEVBQUUsQ0FBQztnQkFDekMsTUFBTSxJQUFJLEtBQUssQ0FDYix3QkFBd0IsV0FBVyxPQUFPLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHLENBQzdFLENBQUE7WUFDSCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLEdBQUcsY0FBYyxDQUFBO1FBQ3hELENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELElBQUksQ0FBb0IsT0FBVTtRQUNoQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtRQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQztZQUN4QyxNQUFNLElBQUksS0FBSyxDQUFDLDZCQUE2QixXQUFXLEVBQUUsQ0FBQyxDQUFBO1FBRTdELElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUMsQ0FBQyxTQUFTLFdBQVcsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDeEUsQ0FBQztJQUVELE9BQU8sQ0FBa0IsS0FBUTtRQUMvQixNQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQTtRQUN4QyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUM7WUFDbEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUE7SUFDekUsQ0FBQztDQUNGIn0=