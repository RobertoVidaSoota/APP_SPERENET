import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-email',
  templateUrl: './email.page.html',
  styleUrls: ['./email.page.scss'],
})
export class EmailPage implements OnInit {

  formRegister = {
    id_user: "",
    email: "",
  }

  constructor(
    private api: ApiService,
    private toastCrtl: ToastController,
    private nav: NavController,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    let input = document.querySelector("input")

    input.focus()

    // ID USUARIO DO STORAGE
    this.formRegister.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";

    // PEGAR EMAIL 
    this.api.apiBuscarPerfilConta(this.formRegister.id_user).subscribe((res) => 
    {
      this.formRegister.email = res["data"]["0"]["email"]
    },e => 
    {
      this.toastRegister("Ocorreu um erro inesperado")
    })
  }


  // ENVIAR EMAIL PARA ATUALIZAR
  sendEmail()
  {
    if(this.checkInput() == true)
    {
      this.api.apiAtualizarEmail(this.formRegister).subscribe((res) => 
      {
        if(res["update"] == true)
        {
          this.loading()
          setTimeout(() => {
            this.loadCtrl.dismiss()
            this.toastConfirm(res["msg"])
          }, 2000)
        }else if(res["update"] == false)
        {
          this.toastRegister(res["msg"])
        }
      }, e => 
      {
        this.toastRegister("Ocorreu um erro inesperado")
      })
    }
  }


  // VALIDAR INPUTS
  checkInput():Boolean
  {
    if(this.formRegister.email == "")
    {
      this.toastRegister("O campo email deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.email.indexOf("@") < 0)
    {
      this.toastRegister("O email não pode ficar sem o @.")
      return false;
    }

    return true;
  }


  // TOASTS
  toastRegister(msg)
  {
    return this.toastCrtl.create({
      message: msg,
      color: "danger",
      position: "top",
      buttons: [
        {
          text: "x",
          role: "cancel" 
        }
      ],
      duration: 5000
    }).then((res) => {
      res.present()
    })
  }


  toastConfirm(msg)
  {
    return this.toastCrtl.create({
      message: msg,
      color: "success",
      position: "top",
      buttons: [
        {
          text: "x",
          role: "cancel" 
        }
      ],
      duration: 3000
    }).then((res) => {
      res.present()
    })
  }


  // LOADING
  async loading()
  {
    const load = await this.loadCtrl.create({
      cssClass: "my-loading-class",
    }).then((load) => {
      load.present()
    });
  }

}
