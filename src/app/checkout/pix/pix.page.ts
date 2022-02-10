import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.page.html',
  styleUrls: ['./pix.page.scss'],
})
export class PixPage implements OnInit {

  isOpen:boolean = false;

  constructor(
  ) { }

  ngOnInit(){
  }

  myPopover()
  {
    this.isOpen = !this.isOpen;
  }


}
