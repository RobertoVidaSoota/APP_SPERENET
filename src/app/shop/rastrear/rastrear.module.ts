import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RastrearPageRoutingModule } from './rastrear-routing.module';

import { RastrearPage } from './rastrear.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RastrearPageRoutingModule
  ],
  declarations: [RastrearPage]
})
export class RastrearPageModule {}
