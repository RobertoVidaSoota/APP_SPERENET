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
  cep = "";
  numeroCasa = "";
  installments:number = 1;

  products = [];
  amount;
  amountString;
  valorPorParcela;

  valorTotalDetalhes:string;


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
    },
    e => 
    {
      this.toastBox("Ocorreu um erro, tente novamente", "danger")
    })
  }



  // PEGAR VALORES DAS PARCELAS E MUDAR O VALOR TOTAL
  mudarParcela()
  {
    this.valorPorParcela = this.amount / this.installments
    this.valorTotalDetalhes = this.valorPorParcela.toLocaleString('pt-br', 
      {
        style: "currency",
        currency: "BRL"
      });
  }



  // PAGAR COM ASAAS
  async sendPayment()
  {
    let bodyString = {
      id_compra: this.products[0].id_compra,
      id_user: this.id_user,
      name: this.creditCard.name,
      number: this.creditCard.num,
      cvv: this.creditCard.cvv,
      mouthExp: this.creditCard.monthExp,
      year: this.creditCard.yearExp,
      cep: this.cep,
      numero_endereco: this.numeroCasa,
      items: this.products,
      parcelas: this.installments,
      valorPorParcela: this.valorPorParcela,
      total: this.amount
    };
    this.load.create().then(e => e.present())
    await this.api.cardPayment(bodyString).subscribe(res => 
    {        
        if(res["success"] == true)
        {
          console.log(res)
          this.toastBox("Compra realizada com successo", "success")
          localStorage.setItem("reload", "1")
          this.load.dismiss()
          this.router.navigate(["/tabs"])
        }
        else
        {
          console.log(res)
          this.toastBox("Ocorreu um erro, verifique se os dados estão corretos", "danger")
          this.load.dismiss()
        }
    }, e => {
      console.log(e)
      this.toastBox("Ocorreu um erro, tente novamente", "danger")
      this.load.dismiss()
    })
  }
  


  


  // MENSSAGENS
  myPopover()
  {
    this.isOpen = !this.isOpen;
  }

  // myLoading()
  // {
  //   return this.load.create({
  //     backdropDismiss: false,
  //     duration: Infinity,
  //     cssClass: "my-load-class"
  //   }).then(res => res.present())
  // }

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
