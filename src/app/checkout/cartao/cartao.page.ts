import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
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

  id_user;

  isOpen:boolean = false;

  paymentMethods: Array<any> = [];
  creditCard = {
    num: "4111111111111111",
    cvv: "123",
    monthExp: "12",
    yearExp: "2030",
    brand: "",
    token: "",
    name: ""
  };
  installments:number = 1

  products = [];
  amount;
  amountString;
  valueCart;
  valorPorParcela;

  paymentMethod: string = 'CREDIT_CARD';

  constructor(
    private load: LoadingController,
    private router: Router,
    private active: ActivatedRoute,
    private api: ApiService,
    private ref: ChangeDetectorRef,
    private toast: ToastController
  ) { }



  ngOnInit():void
  {
    this.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";
    let value = 
    {
      id_user: this.id_user
    }
    this.api.apiPegarCarrinho(value).subscribe((res) => 
    {
      this.products = res["carrinho"]
      this.valueCart = res["carrinho"][0]["valor_total"]

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

                    // PEGAR A BANDEIRA E O VALOR DAS PARCELAS
                    this.getCreditCardBrand()

                    // Detecção de mudanças
                    this.ref.detectChanges();
                    //this.segment.ngAfterContentInit();
                  }
                });
          },
          e => {
            this.toastBox("Ocorreu um erro, tente novamente", "danger")
          })
    })
    },
    e => 
    {
      this.toastBox("Ocorreu um erro, tente novamente", "danger")
    })
  }


  // PEGA A CHAVE DA SESSÃO DA API
  initSession(data) {
      PagSeguroDirectPayment.setSessionId(data.pag_id.sessionID);
  }


  // PEGAR VALORES DAS PARCELAS E MUDAR O VALOR TOTAL
  getInstallmentsCompra()
  {
    let brand = this.creditCard.brand
    let installments = this.installments

    PagSeguroDirectPayment.getInstallments({
      amount: this.valueCart,
      maxInstallmentsNoInterest: 2,
      brand: brand,
      success: response =>  
      {
        let i = installments - 1
        this.amount = response.installments[brand][i].totalAmount;
        this.valorPorParcela = 
          response.installments[brand][i].installmentAmount;
        
        
        this.ref.detectChanges();
      } 
    })
  }


  // PEGAR BANDEIRA
  getCreditCardBrand()
  {
    PagSeguroDirectPayment.getBrand({
      cardBin: this.creditCard.num.substring(0, 6),
      success: response => {
        this.creditCard.brand = response.brand.name;
        this.getInstallmentsCompra();

        this.ref.detectChanges();
      }
    });
  }


  // INICIAR PAGAMENTO
  paymentCreditCart()
  {
    this.getCrediCartToken();
  }
  

  // PEGAR TOKEN DO CARTAO
  getCrediCartToken()
  {
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
  sendPayment()
  {
    let bodyString = JSON.stringify({
      // FORMAR OBJETO COM OS ATRIBUTOS DOS ITEMS
      items: "(roteador, mouse)",
      token: this.creditCard.token,
      hash: PagSeguroDirectPayment.getSenderHash(),
      method: this.paymentMethod,
      installments: this.installments,
      total: this.amount
    });

    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    this.api.finalPayment(bodyString, headers).subscribe(response => {
          console.log(JSON.stringify(response));
      }, e => {
        console.log(JSON.stringify(e))
        this.toastBox("Ocorreu um erro, tente novamente", "danger")
      })
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

  // TORRADA DE MENSAGEM
  toastBox(msg, color) 
  {
    return this.toast.create({
      message: msg,
      color: color,
      position: "top", 
      duration: 2000
    }).then((t) => 
    {
      t.present()
    });
  }

}
