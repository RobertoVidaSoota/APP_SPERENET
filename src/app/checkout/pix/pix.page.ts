import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-pix',
  templateUrl: './pix.page.html',
  styleUrls: ['./pix.page.scss'],
})
export class PixPage implements OnInit {

  isOpen:boolean = false;

  constructor(
    private load: LoadingController,
    private router: Router,
    private toast: ToastController
  ) { }

  ngOnInit(){
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
    }).then(res => res.present())

    let myToast = this.toast.create({
      duration: 1000,
      message: "Pix foi copiado com sucesso!",
      cssClass: "toast-class"
    }).then(res => res.present())
  }


}
