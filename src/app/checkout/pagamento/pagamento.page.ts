import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-pagamento',
  templateUrl: './pagamento.page.html',
  styleUrls: ['./pagamento.page.scss'],
})

export class PagamentoPage implements OnInit {

  idCompra:number;

  constructor(
    private router: Router,
    private load: LoadingController,
    private alert: AlertController,
    private toast: ToastController,
    private active: ActivatedRoute,
    private api: ApiService
  ){}

  ngOnInit()
  {
    this.active.queryParams.subscribe((res) => 
    {
      this.idCompra = res["id"]
    })
  }


  // MANDAR O MÉTODO PRO BANCO DE DADOS
  method(metodo)
  {
    let body = 
    {
      id_compra: this.idCompra,
      metodo: metodo
    }
    this.api.apiEcolherPaagamento(body).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        if(metodo == "pix"){ this.router.navigate(["/pix"]) }
        if(metodo == "cartao"){ this.router.navigate(["/cartao"]) }
        if(metodo == "boleto"){ this.router.navigate(["/boleto"]) }
      }
      else
      {
        this.toastBox("Ocorreu um erro ineperado", "danger")
      }
    }, e => 
    {
      this.toastBox("Ocorreu um erro ineperado", "danger")
      console.log(e)
    })
  }


  // ALERTA DE ESCOLHA
  alerta(page)
  {
    return this.alert.create({
      header: "Deseja escolher o médoto "+page+" ?",
      buttons: 
      [
        {
          text: "Sim",
          role: "confirm",
          handler:() =>
          {
            this.carregar(page)
          }
        },
        {
          text: "Não",
          role: "cancel"
        }
      ]
    })
    .then((a) => 
    {
      a.present()
    })
  }


  // LOADING
  carregar(page)
  {
    return this.load.create({
      cssClass: "my-loading-class",
      duration: 1000,
    })
    .then((l) => 
    {
      l.present();

      l.onDidDismiss().then(() => 
      {
        this.method(page)
      })
    })
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
