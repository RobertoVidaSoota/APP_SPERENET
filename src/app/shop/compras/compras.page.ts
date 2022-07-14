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
          this.compras.push(res["compras"][position])
        }
      },
      e => 
      {
        console.log(e)
      })
    }
  }

  onClick()
  {
    console.log("ativou")
  }

}
