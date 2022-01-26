import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RastrearPage } from './rastrear.page';

const routes: Routes = [
  {
    path: '',
    component: RastrearPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RastrearPageRoutingModule {}
