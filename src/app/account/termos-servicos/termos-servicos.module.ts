import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TermosServicosPageRoutingModule } from './termos-servicos-routing.module';

import { TermosServicosPage } from './termos-servicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TermosServicosPageRoutingModule
  ],
  declarations: [TermosServicosPage]
})
export class TermosServicosPageModule {}
