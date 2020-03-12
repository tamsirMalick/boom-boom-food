import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Plat } from 'src/app/models/plat';
import { PlatService } from '../../services/plat.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modifier',
  templateUrl: './modifier.page.html',
  styleUrls: ['./modifier.page.scss'],
})
export class ModifierPage implements OnInit {
  id: number;
  currentplat: Plat;

  constructor(private route: ActivatedRoute, private platService: PlatService, private router: Router) {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
  }

  ngOnInit() {
    this.getPlat();
  }

  private getPlat() {
    this.platService.getPlat(this.id).subscribe(plat => {
      this.currentplat = plat;
    });
  }

  back() {
    this.router.navigateByUrl('/plats');
  }

  onUpdate() {
    this.platService.update(this.currentplat).subscribe(() => {
      this.back();
    });
  }
}
