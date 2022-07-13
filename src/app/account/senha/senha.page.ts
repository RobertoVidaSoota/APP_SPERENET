import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.page.html',
  styleUrls: ['./senha.page.scss'],
})
export class SenhaPage implements OnInit {

  formRegister = {
    id_user: "",
    password: "",
    confirmPassword: ""
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
    // ID USUARIO
    this.formRegister.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";
  }

  // ENVIAR EMAIL PARA ATUALIZAR
  sendPassword()
  {
    if(this.checkInput() == true)
    {
      this.api.apiAtualizarSenha(this.formRegister).subscribe((res) => 
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
    if(this.formRegister.password == "")
    {
      this.toastRegister("O campo senha deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.password.length < 8)
    {
      this.toastRegister("O senha deve ter pelo menos 8 caracteres.")
      return false;
    }else if(this.formRegister.confirmPassword == "")
    {
      this.toastRegister("O campo confirmar senha deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.confirmPassword !== this.formRegister.password)
    {
      this.toastRegister("O campo confirmar senha deve ser igual a senha.")
      return false;
    }

    return true;
  }


  // TAMANHO MINIMO DO INPUT
  inputLen(e)
  {
    let value = e.target.value
    let id = e.target.id
    let min = e.target.minLength
    
     if(value.length < min)
     {
        document.querySelector("#"+id)
        .classList.add("input_erro")
     }
     else
     {
        document.querySelector("#"+id)
        .classList.remove("input_erro")
     }
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
