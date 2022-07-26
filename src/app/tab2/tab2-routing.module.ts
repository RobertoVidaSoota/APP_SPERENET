import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Tab2Page } from './tab2.page';

const routes: Routes = [
  {
    path: '',
    component: Tab2Page,
    children: [
      {
        path: 'pesquisar',
        loadChildren: () => import('../shop/pesquisar/pesquisar.module').then( m => m.PesquisarPageModule)
      },
      {
        path: 'produto2',
        loadChildren: () => import('../shop/produto2/produto2.module').then( m => m.Produto2PageModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
