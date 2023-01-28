import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import scriptjs from 'scriptjs';
import { HttpHeaders } from '@angular/common/http';

// num: "4111111111111111",
// cvv: "123",
// monthExp: "12",
// yearExp: "2030",

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
    num: "",
    cvv: "",
    monthExp: "",
    yearExp: "",
    name: ""
  };
  cpf = "";
  installments:number;

  products = [];
  amount;
  amountString;
  valorPorParcela;

  valorTotalDetalhes:string;
  valorParcelaMostrar:string;


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

    // PEGAR PRODUTOS DO CARRINHO
    this.api.apiPegarCarrinho(value).subscribe((res) => 
    {
      this.products = res["carrinho"]
      this.amount = res["carrinho"][0]["valor_total"]
      this.valorTotalDetalhes = this.amount.toLocaleString('pt-br', 
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
      }
      console.log(this.products)
    },
    e => 
    {
      this.toastBox("Ocorreu um erro, tente novamente", "danger")
    })
  }


  // PEGA A CHAVE DA SESSÃO DA API
  // initSession(data) {
  //     PagSeguroDirectPayment.setSessionId(data.pag_id.sessionID);
  // }


  // PEGAR VALORES DAS PARCELAS E MUDAR O VALOR TOTAL
  mudarParcela()
  {
    this.valorPorParcela = this.amount / this.installments
  }


  // PEGAR BANDEIRA
  // getCreditCardBrand()
  // {
  //   PagSeguroDirectPayment.getBrand({
  //     cardBin: this.creditCard.num.substring(0, 6),
  //     success: response => {
  //       this.creditCard.brand = response.brand.name;
  //       this.getInstallmentsCompra();

  //       this.ref.detectChanges();
  //     }
  //   });
  // }


  // INICIAR PAGAMENTO
  // paymentCreditCart()
  // {
  //   this.getCrediCartToken();
  // }
  

  // PEGAR TOKEN DO CARTAO
  // getCrediCartToken()
  // {
  //   PagSeguroDirectPayment.createCardToken({
  //     cardNumber: this.creditCard.num,
  //     brand: this.creditCard.brand,
  //     cvv: this.creditCard.cvv,
  //     expirationMonth: this.creditCard.monthExp,
  //     expirationYear: this.creditCard.yearExp,
  //     success: response => {
  //       this.creditCard.token = response.card.token;
  //       // Detecção de mudanças
  //       this.ref.detectChanges();
  //       this.sendPayment();
  //     }
  //   });
  // }


  // ENVIAR PAGAMENTO AO SERVIDOR
  // sendPayment()
  // {
  //   // FORMAR OBJETO COM OS ATRIBUTOS DOS ITEMS
  //   let bodyString = JSON.stringify({
  //     id_compra: this.products[0].id_compra,
  //     id_user: this.id_user,
  //     name: this.creditCard.name,
  //     cpf: this.cpf,
  //     items: this.products,
  //     token: this.creditCard.token,
  //     hash: PagSeguroDirectPayment.getSenderHash(),
  //     method: this.paymentMethod,
  //     parcelas: this.installments,
  //     valorPorParcela: this.valorPorParcela,
  //     total: this.amount
  //   });

    

  //   this.myLoading().then(() => 
  //   {
  //     this.api.finalPayment(bodyString).subscribe(res => 
  //     {
        
  //         if(res["success"] == true)
  //         {
  //           this.toastBox("Compra realizada com successo", "success")
  //           localStorage.setItem("reload", "1")
  //           this.router.navigate(["/tabs"])
  //         }
  //         else
  //         {
  //           this.toastBox("Ocorreu um erro, tente novamente", "danger")
  //         }
  //     }, e => {
  //       console.log(e)
  //       this.toastBox("Ocorreu um erro, tente novamente", "danger")
  //     })
  //   })
  // }



  // PAGAR COM ASAAS
  sendPayment()
  {
      let bodyString = {
      id_compra: this.products[0].id_compra,
      id_user: this.id_user,
      name: this.creditCard.name,
      number: this.creditCard.num,
      cvv: this.creditCard.cvv,
      mouthExp: this.creditCard.monthExp,
      year: this.creditCard.yearExp,
      items: this.products,
      parcelas: this.installments,
      valorPorParcela: this.valorPorParcela,
      total: this.amount
    };
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
