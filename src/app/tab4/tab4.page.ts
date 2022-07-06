import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  @ViewChild(IonContent) content: IonContent

  checkLogin = "";

  constructor(
    private router: Router
  ){}

  ngOnInit()
  {
    this.checkLogin = localStorage.getItem("login_usuario") ?
    localStorage.getItem("login_usuario") : "";
  }

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
  }


  // SAIR DA CONTA
  logout()
  {
    if(this.checkLogin = "true")
    {
      localStorage.removeItem("login_usuario");
      this.router.navigate(["/login"]);
    }
  }

}
