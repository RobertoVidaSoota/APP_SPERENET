import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPessoaisPage } from './info-pessoais.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPessoaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPessoaisPageRoutingModule {}
