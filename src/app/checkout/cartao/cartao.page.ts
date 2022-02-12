import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage implements OnInit {

  isOpen:boolean = false;

  constructor(
    private load: LoadingController,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  myPopover()
  {
    this.isOpen = !this.isOpen;
  }


  myLoading()
  {
    let myLoad = this.load.create({
      backdropDismiss: false,
      duration: 100,
      cssClass: "load-class"
    }).then(res => res.present())
  }

}
