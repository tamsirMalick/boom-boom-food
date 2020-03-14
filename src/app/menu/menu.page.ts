import { Component, OnInit } from '@angular/core';
import {MenuService} from '../services/menu.service';
import {Plat} from '../models/plat';
import {Menu} from '../models/menu';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  menus: Menu[];

  constructor(private menuService: MenuService) { }
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
        console.log('Plat supprimé'); });
    }
  }
}
