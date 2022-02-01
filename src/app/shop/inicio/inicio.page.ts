import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonTabButton, NavController } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  

  constructor(
    private route: Router,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  // FUNÇÃO PARA COLOCAR ROLAGEM AUTOMÁTICA PARA O TOPO
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button")  
    var ref = this.content 
    
    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      if(myTab == "tab1")
      {
        ref.scrollToTop(400)
      }
    });
  }

  top()
  {
   this.content.scrollToTop(400)
  }

}
