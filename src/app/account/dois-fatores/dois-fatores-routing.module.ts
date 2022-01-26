import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoisFatoresPage } from './dois-fatores.page';

const routes: Routes = [
  {
    path: '',
    component: DoisFatoresPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoisFatoresPageRoutingModule {}
