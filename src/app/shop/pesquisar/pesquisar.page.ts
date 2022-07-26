import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonContent, IonSearchbar, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-pesquisar',
  templateUrl: './pesquisar.page.html',
  styleUrls: ['./pesquisar.page.scss'],
})
export class PesquisarPage{

  @ViewChild('search') searchbar: IonSearchbar;
  @ViewChild(IonContent) content: IonContent;
  
  tgclass = true;

  pesquisa = []

  constructor(
    private api: ApiService,
    private toast: ToastController, 
    private router: Router,
    private navCtrl: NavController
  ){}

  
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button")   
    var ref = this.content

    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      if(myTab == "tab2")
      {
        ref.scrollToTop(200)
      }
    });

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
        this.router.navigate(["tabs/tab2/produto2"], dataNav)
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
