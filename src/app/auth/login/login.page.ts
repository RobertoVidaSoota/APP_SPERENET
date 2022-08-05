import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';
import { AppComponent } from 'src/app/app.component';

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
    private nav: NavController,
    private router: Router,
    private toastCrtl: ToastController,
    private loadCtrl: LoadingController
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
    } else if(this.form.email.indexOf("@") < 0)
    {
      this.toast("O email não pode ficar sem o @.", "danger")
      return ;
    }

    let formValue = {
      email: this.form.email,
      password: this.form.senha
    }


    this.api.apiFazerLogin(formValue).subscribe((res) => {

      if(res["msg"])
      {
        this.toast(res["msg"], "danger")
      }

      if(res["user"])
      {
        this.loading()
        localStorage.setItem("reload", "1")
        localStorage.setItem("login_usuario", "true")
        localStorage.setItem("id_usuario_logado_app", res["user"]["id"])
        setTimeout(() => {
          this.toast("Login confirmado", "success")
          this.loadCtrl.dismiss()
          this.router.navigate(["/tabs/tab1/inicio"])
        }, 2000)
      }else
      {
        this.toast(res["msg"], "danger")
      }
    }, e => 
    {
      this.toast("Ocorreu um erro inesperado", "danger")
    })
  }


  // TORRADA DE MENSSAGEM
  toast(msg, c)
  {
    const toast = this.toastCrtl.create(
      {message: msg, duration: 3000, color: c, position: "top"})
    .then((res) => {
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
