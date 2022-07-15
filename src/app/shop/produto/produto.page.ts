import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage{

  inputComentarioFadeIn = true;
  
  @ViewChild(".input_comentario") inputComentario;

  dadosProdutos = [];
  especificacoes = [];
  comentarios = [];

  constructor(
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private api: ApiService
  )
  {
  }
  
  // FUNÇÃO PARA COLOCAR EM TODAS AS PÁGINAS SECUNDÁRIAS DAS ABAS
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


    // PEGAR O ID DO PRODUTO
    this.actRoute.queryParams.subscribe((res) => 
    {
      this.dadosProdutos.push(JSON.parse(res["produto"]))
    },
    e => 
    {
      console.log(e)
    })


    // BUSCAR ESPECIFICAÇÕES E COMANTÁRIOS
    this.api.apiBuscarEspecificacaoComentario({product_id:this.dadosProdutos[0]["id"]})
    .subscribe((res) =>
    {
      this.especificacoes = res["data"]["especificacoes"]
      this.comentarios = res["data"]["comentarios"]
      console.log(this.especificacoes)
      console.log(this.comentarios)
    },
    e => {
      console.log(e)
    })
  }


  toggleInput()
  {
    this.inputComentarioFadeIn = !this.inputComentarioFadeIn;
  }

  ngOnInit() {
  }

}
