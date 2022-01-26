import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PixPageRoutingModule } from './pix-routing.module';

import { PixPage } from './pix.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PixPageRoutingModule
  ],
  declarations: [PixPage]
})
export class PixPageModule {}
