import { TodoAddedToList, TodoListCreated, } from '../domain/todo-list/TodoListEvents';
export class UsersProjection {
    constructor(messageBus) {
        this.messageBus = messageBus;
        this.users = {};
        messageBus.registerEventHandler(TodoListCreated, (e) => {
            const event = e;
            this.users[event.aggregateId] = event;
        });
        messageBus.registerEventHandler(TodoAddedToList, (e) => {
            const event = e;
            if (!this.users[event.aggregateId].games) {
                this.users[event.aggregateId].games = [];
            }
            this.users[event.aggregateId].games.push({ name: event.game });
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNQcm9qZWN0aW9uLmpzIiwic291cmNlUm9vdCI6InNyYy8iLCJzb3VyY2VzIjpbInByb2plY3Rpb25zL1VzZXJzUHJvamVjdGlvbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQ0gsZUFBZSxFQUNmLGVBQWUsR0FDbEIsTUFBTSxvQ0FBb0MsQ0FBQTtBQUUzQyxNQUFNLE9BQU8sZUFBZTtJQUd4QixZQUFvQixVQUF1QjtRQUF2QixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBRnBDLFVBQUssR0FBRyxFQUFFLENBQUE7UUFHYixVQUFVLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsTUFBTSxLQUFLLEdBQUcsQ0FBb0IsQ0FBQTtZQUNsQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUE7UUFDekMsQ0FBQyxDQUFDLENBQUE7UUFDRixVQUFVLENBQUMsb0JBQW9CLENBQUMsZUFBZSxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsTUFBTSxLQUFLLEdBQUcsQ0FBb0IsQ0FBQTtZQUNsQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxFQUFFO2dCQUN0QyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFBO2FBQzNDO1lBQ0QsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQTtRQUNoRSxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUM7Q0FDSiJ9