import {Commande} from './commande';

export class User {
    id: number;
    username: string;
    email: string;
    telephone: number;
    password: string;
    photo: [];
    commande: Commande[];
}
