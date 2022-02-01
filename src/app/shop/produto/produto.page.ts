import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage{


  constructor(
    private navCtrl: NavController,
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

  ngOnInit() {
  }

}
