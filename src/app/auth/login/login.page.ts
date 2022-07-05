import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  form = {
    email: "",
    senha: ""
  }

  constructor(
    private api: ApiService,
    private toastCrtl: ToastController
  ) { }

  ngOnInit(){}


  // FUNÇÃO DE FAZER LOGIN
  fazerLogin()
  {
    if(this.form.email == "")
    {
      this.toast("email é obrigatório", "danger")
      return
    }else if(this.form.senha == "")
    {
      this.toast("senha é obrigatória", "danger")
      return
    }

    let formValue = {
      email: this.form.email,
      password: this.form.senha
    }

    this.api.apiFazerLogin(formValue).subscribe((res: Object) => {

      // if(myRes.msg)
      // {
      //   this.toast("", "danger")

      // }

      // if(res.user)
    })
  }


  // TORRADA DE MENSSAGEM
  toast(msg, c)
  {
    const toast = this.toastCrtl.create(
      {message: msg, duration: 3000, color: c})
    .then((res) => {
      res.present()
    })
  }
}
