import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private router: Router
  )
  {
  }

  // REDIRECIONAR PARA A PÁGINA PRICINPAL, QUE PERMITE A NÃO NAVEGAÇÃO DIRETA PARA A PÁGINA PRINCIPAL ENTRE ABAS
  ngOnInit()
  {
    this.router.navigate(["/tabs/tab1/inicio"])
  }

  
  
}
