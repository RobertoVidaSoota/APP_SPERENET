import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscarCategoriaPageRoutingModule } from './buscar-categoria-routing.module';

import { BuscarCategoriaPage } from './buscar-categoria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscarCategoriaPageRoutingModule
  ],
  declarations: [BuscarCategoriaPage]
})
export class BuscarCategoriaPageModule {}
