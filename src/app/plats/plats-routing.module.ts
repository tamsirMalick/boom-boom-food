import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlatsPage } from './plats.page';
import {AuthGuard} from '../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: PlatsPage
  },
  {
    path: 'ajouter',
    loadChildren: () => import('./ajouter/ajouter.module').then( m => m.AjouterPageModule)
  },
  {
    path: 'modifier/:id',
    loadChildren: () => import('./modifier/modifier.module').then( m => m.ModifierPageModule)
  },
  {
    path: 'commande',
    canActivate: [AuthGuard],
    loadChildren: () => import('./commande/commande.module').then( m => m.CommandePageModule)
  },
  {
    path: 'plat-detail/:id',
    canActivate: [AuthGuard],
    loadChildren: () => import('./plat-detail/plat-detail.module').then( m => m.PlatDetailPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlatsPageRoutingModule {}
