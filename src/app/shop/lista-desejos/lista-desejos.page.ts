import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-lista-desejos',
  templateUrl: './lista-desejos.page.html',
  styleUrls: ['./lista-desejos.page.scss'],
})
export class ListaDesejosPage implements OnInit {

  checkLogin = "";

  desejos = [];

  id_usuario;
  id_produto_excluir;

  podeExcluir = false;

  constructor(
    private api: ApiService,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit()
  {
    // VERIFICAR USUÁRIO LOGADO
    this.checkLogin = localStorage.getItem("login_usuario") ?
    localStorage.getItem("login_usuario") : "";

    // PEGAR PRODUTOS DA LISTA DE DESEJOS
    this.id_usuario = localStorage.getItem("id_usuario_logado_app")
    let body = 
    {
      user_id: parseInt(this.id_usuario)
    }
    if(this.checkLogin == 'true')
    {
      this.api.apiBuscarDesejos(body).subscribe((res) => 
      {
        if(res["data"] && res["data"][0])
        {
          this.desejos = res["data"]
        }
        else
        {
          this.desejos = [];
        }
      },
      e => 
      {
        this.toastMessage("Ocorreu um erro inesperado", "danger")
        console.log(e)
      })
    }
  }




  // IR PARA A PÁGINA DO PRODUTO
  produtoPage(id)
  {
    let produtoPassagem;

    this.api.apiBuscarUmProduto({ id_produto: id }).subscribe((res) =>
    {
      if(res["msg"] === "Deu certo" && res["produto"][0])
      {
        produtoPassagem = res["produto"][0]
        let dataNav:NavigationExtras = 
        {
          queryParams:{produto: JSON.stringify(produtoPassagem)}
        }
        this.router.navigate(["/tabs/tab1/produto"], dataNav)
      }
      else
      {
        this.toastMessage("Ocorreu um erro inesperado", "danger")
      }
    },
    e => 
    {
      this.toastMessage("Ocorreu um erro inesperado", "danger")
    })
  }


  // REMOVER DA LISTA DE DESEJOS
  removeItem()
  {
    if(this.podeExcluir = false)
    {
      return;
    }
    else
    {
      // CONFIGURAÇÃO
      let body = 
      {
        id_user: parseInt(this.id_usuario),
        id_produto: this.id_produto_excluir
      }
      // CHAMADA
      this.api.apiRemoverDesejo(body).subscribe((res) => 
      {
        if(res["msg"] === "Deu certo")
        {
          if(res["data"] !== "")
          {
            this.toastMessage("Removido da sua lista de desejos", "success")
            this.podeExcluir = false
            this.ngOnInit()
            console.log(res["data"])
          }
          else
          {
            this.toastMessage("Ocorreu um erro inesperado", "danger")
            this.podeExcluir = false
          }
        }
        this.podeExcluir = false
      },
        e => 
      {
        this.toastMessage("Ocorreu um erro inesperado", "danger")
        this.podeExcluir = false
        console.log(e)
      })
    }
    
  }


  // TOAST
  toastMessage(msg, color)
  {
    return this.toast.create({
      message: msg,
      color: color,
      position: "top",
      duration: 2000
    }).then((t) => 
    {
      t.present()
    })
  }


  // TORRADA DE REMOÇÃO DE PRODUTO
  toastRemoveItem(id)
  {
    this.id_produto_excluir = id;

    return this.toast.create({
      cssClass: "toast-button-color-confirm",
      message: "Tem certeza que quer remover da sua lista de desejos ?",
      buttons: [
        {
          text: "Não",
          handler: () => {
            this.podeExcluir = false
            this.toast.dismiss()
          },
        },
        {
          text: "sim",
          handler: () => 
          {
            this.podeExcluir = true
            this.removeItem()
            this.toast.dismiss()
          }
        }
      ],
      position: "bottom",
    }).then((t) => 
    {
      t.present()
    })
  }


}
