import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('search') searchbar: IonSearchbar;
  tgclass = true;

  pesquisa = []

  constructor(
    private api: ApiService,
    private toast: ToastController, 
    private router: Router
  ){}

  ionViewDidEnter()
  {
    this.searchbar.setFocus();
  }


  // PESQUISAR PRODUTO
  pesquisarProduto(e)
  {
    let text = e.target.value

    if(text == "")
    {
      this.pesquisa = []
      return;
    }

    let body = 
    {
      text: text
    }
    setTimeout(() => 
    {
      this.api.apiPesquisarProduto(body).subscribe((res) => 
      {
        if(res["data"])
        {
          this.pesquisa = res["data"]
        }
        else
        {
          this.pesquisa = []
        }
        console.log(this.pesquisa)
      },
      e => 
      {
        console.log(e)
      })
    }, 100)
  }


  // NAVEGAR PARA O PRODUTO
  navProduto(id)
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
        this.router.navigate(["tabs/tab1/produto"], dataNav)
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
}
