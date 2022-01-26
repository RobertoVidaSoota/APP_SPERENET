import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PixPage } from './pix.page';

const routes: Routes = [
  {
    path: '',
    component: PixPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PixPageRoutingModule {}
