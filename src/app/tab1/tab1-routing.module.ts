import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab1Page } from './tab1.page';

const routes: Routes = [
  {
    path: '',
    component: Tab1Page,
    children: [
      {
        path: 'inicio',
        loadChildren: () => import('../shop/inicio/inicio.module').then
        (m => m.InicioPageModule)
      },
      {
        path: 'produto',
        loadChildren: () => import('../shop/produto/produto.module').then
        (m => m.ProdutoPageModule)
      }
      // COLOCAR O "directTo" VAZIO, PARA QUE PERMITE A NÃO NAVEGAÇÃO DIRETA PARA A PÁGINA PRINCIPAL ENTRE ABAS
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab1PageRoutingModule {}
