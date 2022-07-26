import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscarCategoriaPage } from './buscar-categoria.page';

const routes: Routes = [
  {
    path: '',
    component: BuscarCategoriaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscarCategoriaPageRoutingModule {}
