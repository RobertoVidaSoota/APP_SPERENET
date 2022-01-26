import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoletoPageRoutingModule } from './boleto-routing.module';

import { BoletoPage } from './boleto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoletoPageRoutingModule
  ],
  declarations: [BoletoPage]
})
export class BoletoPageModule {}
