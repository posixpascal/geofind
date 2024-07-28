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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZUJ1cy5qcyIsInNvdXJjZVJvb3QiOiJzcmMvIiwic291cmNlcyI6WyJmcmFtZXdvcmsvTWVzc2FnZUJ1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFLQSxNQUFNLE9BQU8sVUFBVTtJQUF2QjtRQUNVLHFCQUFnQixHQUFHLEVBQUUsQ0FBQTtRQUNyQix3QkFBbUIsR0FBRyxFQUFFLENBQUE7SUF3Q2xDLENBQUM7SUF0Q0Msb0JBQW9CLENBRWxCLEtBQVUsRUFDVixPQUE4QjtRQUU5QixJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7WUFDcEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUE7UUFDeEMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDakQsQ0FBQztJQUVELHVCQUF1QixDQUVyQixRQUFhLEVBRWIsY0FBbUI7UUFFbkIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUM1QyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsV0FBVyxFQUFFLENBQUM7Z0JBQ3pDLE1BQU0sSUFBSSxLQUFLLENBQ2Isd0JBQXdCLFdBQVcsT0FBTyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRyxDQUM3RSxDQUFBO1lBQ0gsSUFBSSxDQUFDLG1CQUFtQixDQUFDLFdBQVcsQ0FBQyxHQUFHLGNBQWMsQ0FBQTtRQUN4RCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRCxJQUFJLENBQW9CLE9BQVU7UUFDaEMsTUFBTSxXQUFXLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7UUFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxXQUFXLENBQUM7WUFDeEMsTUFBTSxJQUFJLEtBQUssQ0FBQyw2QkFBNkIsV0FBVyxFQUFFLENBQUMsQ0FBQTtRQUU3RCxJQUFJLENBQUMsbUJBQW1CLENBQUMsV0FBVyxDQUFDLENBQUMsU0FBUyxXQUFXLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQ3hFLENBQUM7SUFFRCxPQUFPLENBQWtCLEtBQVE7UUFDL0IsTUFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUE7UUFDeEMsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFBO0lBQ3pFLENBQUM7Q0FDRiJ9