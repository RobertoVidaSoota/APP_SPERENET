import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoletoPage } from './boleto.page';

const routes: Routes = [
  {
    path: '',
    component: BoletoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoletoPageRoutingModule {}
