import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'info-pessoais',
    loadChildren: () => import('./account/info-pessoais/info-pessoais.module').then( m => m.InfoPessoaisPageModule)
  },
  {
    path: 'email',
    loadChildren: () => import('./account/email/email.module').then( m => m.EmailPageModule)
  },
  {
    path: 'senha',
    loadChildren: () => import('./account/senha/senha.module').then( m => m.SenhaPageModule)
  },
  {
    path: 'dois-fatores',
    loadChildren: () => import('./account/dois-fatores/dois-fatores.module').then( m => m.DoisFatoresPageModule)
  },
  {
    path: 'preferencias',
    loadChildren: () => import('./account/preferencias/preferencias.module').then( m => m.PreferenciasPageModule)
  },
  {
    path: 'frequencia',
    loadChildren: () => import('./account/frequencia/frequencia.module').then( m => m.FrequenciaPageModule)
  },
  {
    path: 'ajuda',
    loadChildren: () => import('./account/ajuda/ajuda.module').then( m => m.AjudaPageModule)
  },
  {
    path: 'feedback',
    loadChildren: () => import('./account/feedback/feedback.module').then( m => m.FeedbackPageModule)
  },
  {
    path: 'termos-servicos',
    loadChildren: () => import('./account/termos-servicos/termos-servicos.module').then( m => m.TermosServicosPageModule)
  },
  {
    path: 'privacidade',
    loadChildren: () => import('./account/privacidade/privacidade.module').then( m => m.PrivacidadePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'cadastro',
    loadChildren: () => import('./auth/cadastro/cadastro.module').then( m => m.CadastroPageModule)
  },
  {
    path: 'recuperar-senha',
    loadChildren: () => import('./auth/recuperar-senha/recuperar-senha.module').then( m => m.RecuperarSenhaPageModule)
  },
  {
    path: 'carrinho',
    loadChildren: () => import('./checkout/carrinho/carrinho.module').then( m => m.CarrinhoPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./checkout/pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'boleto',
    loadChildren: () => import('./checkout/boleto/boleto.module').then( m => m.BoletoPageModule)
  },
  {
    path: 'cartao',
    loadChildren: () => import('./checkout/cartao/cartao.module').then( m => m.CartaoPageModule)
  },
  {
    path: 'pix',
    loadChildren: () => import('./checkout/pix/pix.module').then( m => m.PixPageModule)
  },
  {
    path: 'lista-desejos',
    loadChildren: () => import('./shop/lista-desejos/lista-desejos.module').then( m => m.ListaDesejosPageModule)
  },
  {
    path: 'buscar-categoria',
    loadChildren: () => import('./shop/buscar-categoria/buscar-categoria.module').then( m => m.BuscarCategoriaPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { 
      preloadingStrategy: PreloadAllModules,
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
