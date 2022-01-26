import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPessoaisPageRoutingModule } from './info-pessoais-routing.module';

import { InfoPessoaisPage } from './info-pessoais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPessoaisPageRoutingModule
  ],
  declarations: [InfoPessoaisPage]
})
export class InfoPessoaisPageModule {}
