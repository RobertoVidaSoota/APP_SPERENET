import { Component, OnInit, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  checkCompras = 1;

  constructor(
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

  }

}
