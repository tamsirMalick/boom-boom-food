import {Commande} from './commande';
import {PlatImg} from './platImg';

export class Plat {
    id: number;
    nom: string;
    prix: number;
    description: string;
    url: string;
    platImg: any;
    commande: Commande[];
}
