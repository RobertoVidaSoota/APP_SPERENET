import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaDesejosPageRoutingModule } from './lista-desejos-routing.module';

import { ListaDesejosPage } from './lista-desejos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaDesejosPageRoutingModule
  ],
  declarations: [ListaDesejosPage]
})
export class ListaDesejosPageModule {}
