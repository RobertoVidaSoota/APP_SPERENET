import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage implements OnInit {

  isOpen:boolean = false;
  bodyTest:object = {
   
  }

  constructor(
    private load: LoadingController,
    private router: Router,
    private service: ApiService
  ) { }

  ngOnInit() {
  }


  checkout()
  {
    this.service.paymentCard(this.bodyTest).subscribe(res => {
      console.log(JSON.stringify(res));
    })
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
