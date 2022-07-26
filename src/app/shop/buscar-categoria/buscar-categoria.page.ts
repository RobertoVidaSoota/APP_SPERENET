import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-buscar-categoria',
  templateUrl: './buscar-categoria.page.html',
  styleUrls: ['./buscar-categoria.page.scss'],
})
export class BuscarCategoriaPage implements OnInit {

  produtos = [];

  constructor(
    private api: ApiService,
    private actv: ActivatedRoute,
    private navCtrl: NavController
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
    let categoria; 

    // PEGAR CATEGORIA
    this.actv.queryParams.subscribe((res) => 
    {
      categoria = res["categoria"]
    },
    e => 
    {
      console.log(e)
    })

    // PEGAR PRODUTOS
    this.api.apiBuscarProdutoPorCategoria({categoria:categoria}).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        console.log(res) 
      }
    },
    e => 
    {
      console.log(e)
    })
  }

}
