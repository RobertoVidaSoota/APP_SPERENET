import { registerLocaleData } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IonContent, IonTabButton, NavController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  @ViewChild(IonContent) content: IonContent;

  opt = {
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 3.2
  }

  opt2 = {
    freeMode: true,
    spaceBetween: 10,
    slidesPerView: 1.3
  }

  constructor(
    private route: Router,
    private navCtrl: NavController,
    private acRoute: ActivatedRoute
  ) { }

  ngOnInit()
  {
  }

 
  ionViewWillEnter()
  {
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
        ref.scrollToTop(200)
      }
    });

  }

  top()
  {
   this.content.scrollToTop(400)
  }

}
