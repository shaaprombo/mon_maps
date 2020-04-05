import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthentifyPage } from './authentify.page';

const routes: Routes = [
  {
    path: '',
    component: AuthentifyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthentifyPageRoutingModule {}
