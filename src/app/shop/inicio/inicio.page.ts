import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { IonContent, IonTabButton, NavController, NavParams } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  opt = {
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 3.2
  }

  opt2 = {
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 1.3
  }

  // VARIÁVEIS DOS PRODUTOS
  novosProdutos = [];
  produtosPopulares = [];
  maisPopulares = [];

  constructor(
    private router: Router,
    private navCtrl: NavController,
    private acRoute: ActivatedRoute,
    private api: ApiService
  ) { }

  ngOnInit()
  {
    // CHAMADA PRA BUSCAR PRODUTOS NOVOS
    this.api.apiBuscarProdutosNovos().subscribe((res) => 
    {
      for(let count1 = 0; count1 < res["data"].length; count1++)
      {
        this.novosProdutos.push(res["data"][count1])
      }
    },
    e => 
    {
      console.log(e)
    })

    
    // CHAMADA PRA BUSCAR PRODUTOS POPULARES
    this.api.apiBuscarProdutosPopulares().subscribe((res) => 
    {
      for(let count2 = 0; count2 < res["data"].length; count2++)
      {
        this.produtosPopulares.push(res["data"][count2])
      }
    },
    e => 
    {
      console.log(e)
    })


    // CHAMADA PRA BUSCAR MAIS PRODUTOS POPULARES
    this.api.apiBuscarMaisProdutos().subscribe((res) => 
    {
      for(let count3 = 0; count3 < res["data"].length; count3++)
      {
        this.maisPopulares.push(res["data"][count3])
      }
    },
    e => 
    {
      console.log(e)
    })
  }


  // NAVEGAR ATÉ O PRODUTO
  navProduto(produto)
  {
    let dataNav:NavigationExtras = 
    {
      queryParams:{produto: JSON.stringify(produto)}
    }
    this.router.navigate(["/tabs/tab1/produto"], dataNav)
  }


  // FUNÇÃO PARA COLOCAR ROLAGEM AUTOMÁTICA PARA O TOPO
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button")  
    var ref = this.content 
    
    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      if(myTab == "tab1")
      {
        ref.scrollToTop(200)
      }
    });

  }

  
  // ROLAR ATÉ O TOP
  top()
  {
   this.content.scrollToTop(400)
  }

}
