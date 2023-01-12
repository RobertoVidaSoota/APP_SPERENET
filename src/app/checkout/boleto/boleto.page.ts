import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import scriptjs from 'scriptjs'
import { HttpHeaders } from '@angular/common/http';

declare let PagSeguroDirectPayment

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.page.html',
  styleUrls: ['./boleto.page.scss'],
})
export class BoletoPage implements OnInit {

  id_user;

  isOpen:boolean = false;

  products = [];
  
  paymentMethods: Array<any> = [];
  amount = 0;
  amountString;
  valueCart;
  valorTotalDetalhes:string;

  paymentMethod: string = 'BOLETO';

  constructor(
    private load: LoadingController,
    private router: Router,
    private toast: ToastController,
    private active: ActivatedRoute,
    private api: ApiService,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit():void
  {
    this.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";
    let value = 
    {
      id_user: this.id_user
    }

    // PEGAR PRODUTOS DO CARRINHO
    this.api.apiPegarCarrinho(value).subscribe((res) => 
    {
      this.products = res["carrinho"]
      this.valueCart = res["carrinho"][0]["valor_total"]
      this.valorTotalDetalhes = this.valueCart.toLocaleString('pt-br', 
      {
        style: "currency",
        currency: "BRL"
      });
      let precoString;
      let dividir;
      let tiraVirgula;
      let flutuar;
      for(let i = 0; i < this.products.length; i++)
      {
        precoString = this.products[i].preco_produto
        dividir = precoString.replace("R$", "")
        dividir = dividir.replace(".", "")
        tiraVirgula = dividir.replace(",", ".")
        flutuar = parseFloat(tiraVirgula)
        this.products[i]["preco_float"] = flutuar
        this.amount += flutuar
      }

    // PEGAR A BIBLIOTECA DO PAGSEGURO
    // scriptjs('https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js', () => {
    //   this.api.getSessionPagseguro()
    //       .subscribe(data => 
    //         {
    //           this.initSession(data);

    //             PagSeguroDirectPayment.getPaymentMethods({
    //               amount: this.amount,
    //               success: response => {
    //                 let paymentMethods = response.paymentMethods;
    //                 // Mapeamento de um objeto transforma em um array
    //                 this.paymentMethods = Object.keys(paymentMethods).map((k) => 
    //                 paymentMethods[k]);

    //                 // Detecção de mudanças
    //                 this.ref.detectChanges();
    //                 //this.segment.ngAfterContentInit();
    //               }
    //             });
    //       },
    //       e => {
    //         this.toastBox("Ocorreu um erro, tente novamente", "danger")
    //       })
    // })
    },
    e => 
    {
      this.toastBox("Ocorreu um erro, tente novamente", "danger")
    })
  }

  
  // PEGA A CHAVE DA SESSÃO DA API
  // initSession(data) {
  //   PagSeguroDirectPayment.setSessionId(data.pag_id.sessionID);
  // }


  // ENVIAR PAGAMENTO AO SERVIDOR
  sendPayment()
  {
    // FORMAR OBJETO COM OS ATRIBUTOS DOS ITEMS
    let bodyString = JSON.stringify({
      id_compra: this.products[0].id_compra,
      id_user: this.id_user,
      items: this.products,
      method: this.paymentMethod,
      total: this.amount
    });

    this.myLoading().then(() => 
    {
      this.api.boletoPayment(bodyString).subscribe(res => 
      {
        
          if(res["success"] == true)
          {
            // this.api.boletoAppToSeguro(res["result"], res["token"]).subscribe((res) => 
            // {
            //   this.toastBox("Compra realizada com successo", "success")
            //   localStorage.setItem("reload", "1")
            //   this.router.navigate(["/tabs"])
            // }, 
            // e => {
            //   console.log(e)
            //   this.toastBox("Ocorreu um erro, tente novamente", "danger")
            // })
            
          }
          else
          {
            this.toastBox("Ocorreu um erro, tente novamente", "danger")
          }
        
      }, e => {
        console.log(e)
        this.toastBox("Ocorreu um erro, tente novamente", "danger")
      })
    })
  }




  // MENSSAGENS
  myPopover()
  {
    this.isOpen = !this.isOpen;
  }

  myLoading()
  {
    return this.load.create({
      backdropDismiss: false,
      duration: 1000,
      cssClass: "my-load-class"
    }).then(res => res.present())
  }

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
