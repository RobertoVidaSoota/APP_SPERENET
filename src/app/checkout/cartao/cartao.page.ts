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
    "reference_id": "ex-00001",
    "description": "Motivo do pagamento",
    "amount": {
      "value": 499900,
      "currency": "BRL"
    },
    "payment_method": {
      "type": "CREDIT_CARD",
      "installments": 1,
      "capture": false,
      "soft_descriptor": "My Store",    
      "card": {
        "number": "4111111111111111",
        "exp_month": "12",
        "exp_year": "2030",
        "security_code": "123",
        "holder": {
          "name": "ROBERTO CARLOS BARBOSA"
        }
      }
    },
    "notification_urls": [
      "https://yourserver.com/nas_ecommerce/277be731-3b7c-4dac-8c4e-4c3f4a1fdc46/"
    ]
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
