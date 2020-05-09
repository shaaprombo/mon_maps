import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrajetPage } from './trajet.page';

const routes: Routes = [
  {
    path: '',
    component: TrajetPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrajetPageRoutingModule {}
