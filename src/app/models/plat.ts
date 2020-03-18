import {Commande} from './commande';

export class Plat {
    id: number;
    nom: string;
    prix: number;
    description: string;
    platImg: File;
    commande: Commande[];
}
