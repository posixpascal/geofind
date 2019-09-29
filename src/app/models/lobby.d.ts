import {User} from "./user";

export interface Lobby {
    _id: string;
    name:string;
    password:string;
    users:User[];
}
