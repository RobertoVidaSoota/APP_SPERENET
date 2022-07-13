import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, NavController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild(IonContent) content: IonContent

  checkLogin = "";

  fotoPerfil = "";
  nomeUsuario = "";

  constructor(
    private router: Router,
    private nav: NavController,
    private api: ApiService
  ){}

  ngOnInit(){}

  // FUNÇÃO PARA COLOCAR ROLAGEM AUTOMÁTICA PARA O TOPO
  ionViewDidEnter()
  {
    setTimeout(()=>{
      var tab = document.querySelector("ion-tab-button[aria-selected=true]")
      let myTab = localStorage.getItem("tab")
      var refContent = this.content

      tab.addEventListener("click", function(){
        if(myTab == "tab4")
        {
          refContent.scrollToTop(200)
        }
      });
      
    }, 80)


    // VERIFICAR LOGIN
    this.checkLogin = localStorage.getItem("login_usuario") ?
    localStorage.getItem("login_usuario") : "";


    // BUSCAR INFORMAÇÕES DA CONTA
    if(this.checkLogin == 'true')
    {
      let id_user = localStorage.getItem("id_usuario_logado_app")
      this.api.apiBuscarPerfilConta(id_user).subscribe((res) => 
      {
        this.fotoPerfil = res["data"]["0"]["profile_photo_path"]
        this.nomeUsuario = res["data"]["0"]["info_pessoais"]["nome_usuario"]
      }, e => 
      {
        console.log(e)
      })
    }
  }
  

  // SAIR DA CONTA
  logout()
  {
    if(this.checkLogin = "true")
    {
      localStorage.removeItem("login_usuario");
      localStorage.removeItem("id_usuario_logado_app")
      this.nav.navigateRoot("/login");
    }
  }

}
