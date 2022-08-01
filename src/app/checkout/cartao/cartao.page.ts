import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import scriptjs from 'scriptjs';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators'


declare let PagSeguroDirectPayment;

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
  amount = "4999";
  products = []

  paymentMethod: string = 'CREDIT_CARD';

  constructor(
    private load: LoadingController,
    private router: Router,
    private api: ApiService,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit():void {

    scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
        this.api.getSessionPagseguro()
            .subscribe(data => 
              {
                this.initSession(data);

                  PagSeguroDirectPayment.getPaymentMethods({
                    amount: this.amount,
                    success: response => {
                      let paymentMethods = response.paymentMethods;
                      // Mapeamento de um objeto transforma em um array
                      this.paymentMethods = Object.keys(paymentMethods).map((k) => 
                      paymentMethods[k]);
                      // Detecção de mudanças
                      this.ref.detectChanges();
                      //this.segment.ngAfterContentInit();
                    }
                  });
            })
    })
  }


  initSession(data) {
      PagSeguroDirectPayment.setSessionId(data.pag_id.sessionID);
  }


  // INICIAR PAGAMENTO
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


  // ENVIAR PAGAMENTO AO SERVIDOR
  sendPayment() {
    let bodyString = JSON.stringify({
      // FORMAR OBJETO COM OS ATRIBUTOS DOS ITEMS
      items: "(roteador, mouse)",
      token: this.creditCard.token,
      hash: PagSeguroDirectPayment.getSenderHash(),
      method: this.paymentMethod,
      installments: 1,
      total: this.amount
    });

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.api.finalPayment(bodyString, headers).subscribe(response => {
          console.log(JSON.stringify(response));
      }, e => {
        console.log(JSON.stringify(e))
      })
      // .error((error:any) => Observable.throw(error.json().error || 'Serve Erro'));

  }
  
  
  // MENSSAGENS
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
