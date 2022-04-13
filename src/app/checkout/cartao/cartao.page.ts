import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'

// https://github.com/schoolofnetcom/ionic3-pagseguro/blob/master/src/pages/checkout/checkout.ts

declare var PagSeguroDirectPayment;

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage implements OnInit {

  isOpen:boolean = false;

  paymentMethods: Array<any> = [];
  creditCard = {
    num: "4111111111111111",
    cvv: "123",
    monthExp: "12",
    yearExp: "2030",
    brand: "",
    token: ""
  };

  paymentMethod: string = 'CREDIT_CARD';

  constructor(
    private load: LoadingController,
    private router: Router,
    private service: ApiService,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit():void {
    // let pag_id = localStorage.getItem("pag_id")

    PagSeguroDirectPayment.getPaymentMethods({
      amount: "499900",
      success: response => {
        let paymentMethods = response.paymentMethods;
        // Mapeamento de um objeto transforma em um array
        this.paymentMethods = Object.keys(paymentMethods).map((k) => paymentMethods[k]);
        // Detecção de mudanças
        this.ref.detectChanges();
        //this.segment.ngAfterContentInit();
      }
    });
  }

//   ionViewDidLoad() {
//     scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
//         this.paymentHttp.getSession()
//             .subscribe(data => {
//                 this.initSession(data);
//                 this.getPaymentMethods();
//             })
//     })
// }

//   initSession(data) {
//       PagSeguroDirectPayment.setSessionId(data.sessionId);
//   }

  
  paymentCreditCart() {
    this.getCreditCardBrand();
  }
  // PEGAR BANDEIRA
  getCreditCardBrand() {
    PagSeguroDirectPayment.getBrand({
      cardBin: this.creditCard.num.substring(0, 6),
      success: response => {
        this.creditCard.brand = response.brand.name;
        console.log(response.brand.name);
        // Detecção de mudanças
        this.ref.detectChanges();
        this.getCrediCartToken();
      }
    });
  }
  
  // PEGAR TOKEN DO CARTAO
  getCrediCartToken() {
    PagSeguroDirectPayment.createCardToken({
      cardNumber: this.creditCard.num,
      brand: this.creditCard.brand,
      cvv: this.creditCard.cvv,
      expirationMonth: this.creditCard.monthExp,
      expirationYear: this.creditCard.yearExp,
      success: response => {
        this.creditCard.token = response.card.token;
        // Detecção de mudanças
        this.ref.detectChanges();
        this.sendPayment();
      }
    });
  }

  sendPayment() {
    let bodyString = JSON.stringify({
      items: ["roteador", "mouse"],
      token: this.creditCard.token,
      hash: PagSeguroDirectPayment.getSenderHash(),
      method: this.paymentMethod,
      total: "499900"
    });
    // let headers = new Headers({
    //   'Content-Type': 'application/json'
    // });
    //  let options = new Options ({
    //    headers: headers
    //  });
    this.http.post("http://127.0.0.1:8100/api/post_final_payment", bodyString)
      .subscribe(response => {
          console.log(JSON.stringify(response));
      });
      //.catch((error:any) => Observable.throw(error.json().error || 'Serve Erro'));

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
