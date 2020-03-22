import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plat } from '../../models/plat';
import { PlatService } from '../../services/plat.service';
import { MenuService } from '../../services/menu.service';
import {Menu} from '../../models/menu';
import {Router} from '@angular/router';
import {UtilsService} from '../../services/utils.service';

@Component({
  selector: 'app-plat-detail',
  templateUrl: './plat-detail.page.html',
  styleUrls: ['./plat-detail.page.scss'],
})
export class PlatDetailPage implements OnInit {
  id: number;
  menu: Menu;
  currentplat: Plat;

  constructor(private route: ActivatedRoute, private platService: PlatService, private menuService: MenuService,
              private router: Router, private utilsService: UtilsService) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
   }

  ngOnInit() {
    this.getDetail();
  }

  getDetail() {
    this.platService.getPlat(this.id).subscribe(plat => {
      this.currentplat = plat;
    });
  }

    addAuMenuDuJour() {
        this.menu = new Menu();
        this.menu.plat = this.currentplat;
        this.menuService.addMenu(this.menu).subscribe(() => { this.router.navigateByUrl('/menu'); });
    }

  isAdmin(): boolean {
    return this.utilsService.userRole();
  }
}
