import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatDetailPageRoutingModule } from './plat-detail-routing.module';

import { PlatDetailPage } from './plat-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlatDetailPageRoutingModule
  ],
  declarations: [PlatDetailPage]
})
export class PlatDetailPageModule {}
