import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthentifyPageRoutingModule } from './authentify-routing.module';

import { AuthentifyPage } from './authentify.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthentifyPageRoutingModule
  ],
  declarations: [AuthentifyPage]
})
export class AuthentifyPageModule {}
