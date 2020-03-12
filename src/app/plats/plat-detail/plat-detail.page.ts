import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plat } from '../../models/plat';
import { PlatService } from '../../services/plat.service';

@Component({
  selector: 'app-plat-detail',
  templateUrl: './plat-detail.page.html',
  styleUrls: ['./plat-detail.page.scss'],
})
export class PlatDetailPage implements OnInit {
  id: number;
  currentplat: Plat;

  constructor(private route: ActivatedRoute, private platService: PlatService) {
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

}
