import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private navCtrl: NavController,
    private route: Router
    ) {}

  ngOnInit()
  {
    this.route.navigate(["/tabs/tab1/inicio"])
  }
  
}
