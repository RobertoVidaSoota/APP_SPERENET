import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { List } from 'postcss/lib/list';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinho:any = [];
  id_user = "";

  constructor(
    private api: ApiService,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit()
  {
    // VERIFICAR ID DO USUÁRIO LOGADO
    this.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";

    // PEGAR PRODUTOS DO CARRINHO
    let bodyCarrinho = { id_user: parseInt(this.id_user) }
    if(this.id_user !== "")
    {
      this.api.apiPegarCarrinho(bodyCarrinho).subscribe((res) => 
      {
        if(res["success"] == true)
        {
          this.carrinho = res["carrinho"]
          console.log(res["carrinho"])
        }
      },
      e => 
      {
        console.log(e)
      })
    }
  }

}
