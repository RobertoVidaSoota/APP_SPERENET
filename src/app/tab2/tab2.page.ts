import { Component, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonSearchbar, ToastController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  constructor(
    private router: Router
  ){}

  ngOnInit()
  {
    this.router.navigate(["/tabs/tab2/pesquisar"])
  }

 
}
