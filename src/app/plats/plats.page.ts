import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PlatService } from '../services/plat.service';

@Component({
  selector: 'app-plats',
  templateUrl: './plats.page.html',
  styleUrls: ['./plats.page.scss'],
})
export class PlatsPage implements OnInit {
  plats = [];

  constructor(private router: Router, private platService: PlatService) {
    this.getAllPlats();
  }

  getAllPlats() {
    this.platService.getAll().subscribe(data => {
          this.plats = data;
        },
        error => {
          console.log('Une erreur est surenue');
        });
  }

  ngOnInit() {
  }
  ionViewWillEnter() {
    this.getAllPlats();
  }

  addPlat() {
    this.router.navigateByUrl('plats/ajouter');
  }
  update(id: number) {
    this.router.navigate(['plats/modifier', id]);
  }

  deletePlat(id: number) {
    console.log(id);
    this.platService.deletePlat(id).subscribe(() => { this.getAllPlats(); });
  }

  details(id: number) {
    this.router.navigate(['plats/plat-detail', id]);
  }
}
