import { Component, ViewChild } from '@angular/core';
import { IonSearchbar } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  @ViewChild('search') searchbar: IonSearchbar;
  tgclass = true;

  constructor() {}

  ionViewDidEnter()
  {
    this.searchbar.setFocus();
  }

}
