import { Component, OnInit } from '@angular/core';
import {CommandeService} from '../../services/commande.service';
import {Commande} from '../../models/commande';
import {UtilsService} from '../../services/utils.service';
import localeFr from '@angular/common/locales/fr';
import {registerLocaleData} from '@angular/common';
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-commande',
  templateUrl: './commande.page.html',
  styleUrls: ['./commande.page.scss'],
})
export class CommandePage implements OnInit {
  isValidated = false;
  option = '';
  commandes: Commande[];
  commande: Commande;
  userId = 0;
  constructor(private commandeService: CommandeService, private utilsService: UtilsService) {
    this.userId = Number(localStorage.getItem('userId'));
  }

  ngOnInit() {
    this.getUsersCommande();
  }
  getUsersCommande() {
    this.commandeService.getAllCommande().subscribe(data => {
      this.commandes = data;
    });
  }
  isAdmin(): boolean {
    return this.utilsService.userRole();
  }

  valider(id: number) {
    this.isValidated = true;
    this.commandeService.getUserCommande(id).subscribe(data => {
      this.commande = data;
      this.commande.validated = this.isValidated;
      this.commandeService.validateCommande(this.commande).subscribe(data => {
        const username = data.user.username;
        this.utilsService.presentToast('Commande de ' + username + 'validé !', 'success');
        this.getUsersCommande();
      });
    });
  }

  annuler(id: number) {
    if (confirm('Vous allez annuler cette commande ?')) {
      this.commandeService.removeCommande(id).subscribe(data => {
        const username = data.user.username;
        this.utilsService.presentToast('Commande de ' + username + ' annulé !', 'success');
        this.getUsersCommande();
      });
    }
  }
}
