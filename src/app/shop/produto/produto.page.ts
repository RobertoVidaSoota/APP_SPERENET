import { Component, OnInit, ViewChild } from '@angular/core';
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

  constructor(
    private navCtrl: NavController,
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
      // console.log(myTab)
      if(myTab == "tab1")
      {
        navVar.navigateRoot("/tabs/tab1/inicio");
      }
    });

  }


  toggleInput()
  {
    this.inputComentarioFadeIn = !this.inputComentarioFadeIn;
  }

  ngOnInit() {
  }

}
