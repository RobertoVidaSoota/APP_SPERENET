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

  boleto = {
    code: "Código aparece aqui."
  }
  
  paymentMethods: Array<any> = [];
  amount = 0;
  amountString;
  valueCart;
  valorTotalDetalhes:string;

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

  
  

  async sendPayment()
  {
    let bodyString = {
      id_compra: this.products[0].id_compra,
      id_user: this.id_user,
      items: this.products,
      parcelas: "1",
      valorPorParcela: this.amount,
      total: this.amount
    };
    this.load.create().then(e => e.present())
    await this.api.boletoPayment(bodyString).subscribe(res => 
    {        
        if(res["success"] == true)
        {
          console.log(res)
          this.toastBox("Boleto gerado com success", "success")
          this.boleto.code = res["barCode"]
          this.load.dismiss()
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
      duration: 4000
    }).then((t) => 
    {
      t.present()
    });
  }

}
