import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-buscar-categoria',
  templateUrl: './buscar-categoria.page.html',
  styleUrls: ['./buscar-categoria.page.scss'],
})
export class BuscarCategoriaPage implements OnInit {

  produtos = [];
  NomeCategoria = "";
  prestacaoProduto = false;

  constructor(
    private api: ApiService,
    private actv: ActivatedRoute,
    private navCtrl: NavController,
    private router: Router,
  ) { }


  // FUNÇÃO PARA COLOCAR ROLAGEM AUTOMÁTICA PARA O TOPO
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button")   
    var navVar = this.navCtrl;

    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      if(myTab == "tab1")
      {
        navVar.navigateRoot("/tabs/tab1/inicio");
      }
    });
  }


  ngOnInit()
  {
    // PEGAR CATEGORIA
    this.actv.queryParams.subscribe((res) => 
    {
      this.NomeCategoria = res["categoria"]
      this.produtos = JSON.parse(res["produtos"])
    },
    e => 
    {
      console.log(e)
    })
  }


  // PAGINA DO PRODUTO
  navProduto(produto)
  {
    let dataNav:NavigationExtras = 
    {
      queryParams:{produto: JSON.stringify(produto)}
    }
    this.router.navigate(["/tabs/tab1/produto"], dataNav)
  }

}
