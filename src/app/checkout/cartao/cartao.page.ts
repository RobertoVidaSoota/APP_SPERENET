import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import scriptjs from 'scriptjs';
import { HttpHeaders, HttpParamsOptions } from '@angular/common/http';
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

  paymentMethod: string = 'CREDIT_CARD';

  constructor(
    private load: LoadingController,
    private router: Router,
    private service: ApiService,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
  ) { }

  ngOnInit():void {

    scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
        this.service.getSessionPagseguro()
            .subscribe(data => {
                this.initSession(data);
                  PagSeguroDirectPayment.getPaymentMethods({
                    amount: "4999",
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

  // ENVIAR PAGAMENTO AO SERVIDO
  sendPayment() {
    let bodyString = JSON.stringify({
      // FORMAR OBJETO COM OS ATRIBUTOS DOS ITEMS
      items: "(roteador, mouse)",
      token: this.creditCard.token,
      hash: PagSeguroDirectPayment.getSenderHash(),
      method: this.paymentMethod,
      installments: 1,
      total: "4999"
    });
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //  let options = new HttpParamsOptions ({
    //    headers: headers
    //  });
    this.http.post("http://127.0.0.1:8000/api/post_final_payment", 
      bodyString, { headers: headers })
      .subscribe(response => {
          console.log(JSON.stringify(response));
      }, e => {
        console.log(JSON.stringify(e))
      })
      // .error((error:any) => Observable.throw(error.json().error || 'Serve Erro'));

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
