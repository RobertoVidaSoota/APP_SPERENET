import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab3Page } from './tab3.page';

const routes: Routes = [
  {
    path: '',
    component: Tab3Page,
    children: [
      {
        path: 'compras',
        loadChildren: () => import('../shop/compras/compras.module').then( m => m.ComprasPageModule)
      },
      {
        path: "rastrear",
        loadChildren: () => import("../shop/rastrear/rastrear.module").then
        (m => m.RastrearPageModule)
      },
      {
        path: "",
        redirectTo: "",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab3PageRoutingModule {}
