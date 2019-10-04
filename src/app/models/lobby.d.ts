import {User} from "./user";

export interface Lobby {
    id: string;
    name:string;
    password:string;
    users:User[];
}
