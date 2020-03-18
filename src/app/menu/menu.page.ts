import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import {Plat} from '../models/plat';
import {Menu} from '../models/menu';
import {CommandeService} from '../services/commande.service';
import {Commande} from '../models/commande';
import {UtilsService} from '../services/utils.service';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {PlatService} from '../services/plat.service';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menus: Menu[];
  commandes: Commande[];
  commande: Commande;
  user: User;
  plat: Plat;
  userId;
  totalCommand = 0;

  constructor(private menuService: MenuService, private commandeService: CommandeService, private utilsService: UtilsService,
              private userService: UserService, private platService: PlatService) { }
  ngOnInit() {
   this.getMenu();
  }
  getMenu() {
    this.menuService.getMenu().subscribe(data => {
          this.menus = data;
        },
        error => { console.log('Aucun menu disponible'); }
    );
  }
  deletePlat(id: number) {
    if (confirm('Etês vous sur de vouloir supprimé ce menu ?')) {
      this.menuService.deleteMenu(id).subscribe(() => {
        this.getMenu();
        this.utilsService.presentToast('Plat supprimé', 'success'); });
    }
  }
    commander(id: number) {
        this.commande = new Commande();
        this.plat = new Plat();
        this.userId = Number(window.localStorage.getItem('userId'));
        this.userService.getUser(this.userId).subscribe(u => { this.user = u; this.commande.user = this.user; });
        this.platService.getPlat(id).subscribe(data => {
            this.plat = data; this.commande.plat = this.plat;
            this.commandeService.addCommande(this.commande).subscribe(() => {
                this.utilsService.presentToast('Vous avez commandé le plat ' + this.plat.nom, 'success', 2000, 'middle');
                this.totalCommand ++;
            });
        });
    }
}

