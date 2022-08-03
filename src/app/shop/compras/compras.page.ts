import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  checkLogin = "";

  compras:any = [];
  verMaisProdutos = [];

  isOpen:boolean = false;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit()
  {
  }


  ionViewDidLeave()
  {
  }
  

  // FUNÇÃO PARA COLOCAR ROLAGEM AUTOMÁTICA PARA O TOPO
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button[tab=tab3]")
    var ref = this.content 
    
    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      if(myTab == "tab3")
      {
        ref.scrollToTop(200)
      }
    });

    
    // VERIFICAR LOGIN
    this.checkLogin = localStorage.getItem("login_usuario") ?
    localStorage.getItem("login_usuario") : "";

    // BUSCAR COMPRAS
    if(this.checkLogin == 'true')
    { 
      let id_user = {
        id_user: localStorage.getItem("id_usuario_logado_app")
      }
      this.api.apiBuscarCompras(id_user).subscribe((res) => 
      {
        for(let position = 0; position < res["compras"].length; position++)
        {
          if(res["compras"][position]["status"] !== "carrinho")
          {
            this.compras.push(res["compras"][position])            
          }
        }
        for(let position = 0; position < this.compras.length; position++)
        {
          this.compras[position]["produto1"] = []
          this.compras[position]["verMais"] = []

          for(let position2 = 0; position2 < 1; position2++)
          {
            this.compras[position]["produto1"][position2] = this.compras[position].produtos[0]
          }
          for(let position3 = 0; position3 < this.compras[position].produtos.length-1; position3++)
          {
            this.compras[position]["verMais"][position3] = this.compras[position].produtos[position3+1]
          }
        }
      },
      e => 
      {
        console.log(e)
      })
    }
  }


  // VER OS OUTROS PRODUTOS DA COMPRA
  verMais(produtos)
  {
    this.verMaisProdutos = produtos
    setTimeout(() => 
    {
      this.isOpen = true;
    }, 200)
  }
  
  // ABRIR E FECHA POPOVER
  myPopover()
  {
    this.isOpen = !this.isOpen;
  }

}
