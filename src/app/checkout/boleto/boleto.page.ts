import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-boleto',
  templateUrl: './boleto.page.html',
  styleUrls: ['./boleto.page.scss'],
})
export class BoletoPage implements OnInit {

  isOpen:boolean = false;

  constructor(
    private load: LoadingController,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit() {
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

    let myToast = this.toast.create({
      duration: 1000,
      message: "Código foi copiado com sucesso!",
      cssClass: "toast-class"
    }).then(res => res.present())
  }

}
