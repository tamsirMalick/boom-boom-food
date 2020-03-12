import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatDetailPage } from './plat-detail.page';

const routes: Routes = [
  {
    path: '',
    component: PlatDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatDetailPageRoutingModule {}
