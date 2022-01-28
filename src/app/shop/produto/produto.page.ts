import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage implements OnInit {


  constructor(
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private router: Router
  )
  {
    let tab = document.querySelector("ion-tab-button")
    var navVar = this.navCtrl;
    var actRoute = this.actRoute;
    var router = this.router
    var nbm = false;

    tab.addEventListener("click", function()
    {      
      if(router.url == "/tabs/tab1/produto")
      {
        navVar.navigateRoot("/tabs/tab1/inicio");
      }
    });
  }
  
  ionViewDidEnter()
  {
    
  }

  ngOnInit() {
  }

}
