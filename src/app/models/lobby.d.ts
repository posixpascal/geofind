import {User} from "./user";

export interface Lobby {
    id: string;
    name:string;
    clients: number;
    maxClients: number|null;
}
