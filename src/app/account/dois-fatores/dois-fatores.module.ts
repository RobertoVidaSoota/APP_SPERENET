import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoisFatoresPageRoutingModule } from './dois-fatores-routing.module';

import { DoisFatoresPage } from './dois-fatores.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoisFatoresPageRoutingModule
  ],
  declarations: [DoisFatoresPage]
})
export class DoisFatoresPageModule {}
