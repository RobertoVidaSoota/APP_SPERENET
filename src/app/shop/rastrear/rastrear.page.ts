import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-rastrear',
  templateUrl: './rastrear.page.html',
  styleUrls: ['./rastrear.page.scss'],
})
export class RastrearPage implements OnInit {

  constructor(
    private navCtrl: NavController,
  )
  {}

  ngOnInit() {
  }

  // FUNÇÃO PARA COLOCAR EM TODAS AS PÁGINAS SECUNDÁRIAS DAS ABAS
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button[tab=tab3]")   
    var navVar = this.navCtrl;

    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      // console.log(myTab)
      if(myTab == "tab3")
      {
        navVar.navigateRoot("/tabs/tab3/compras");
      }
    });

  }

}
