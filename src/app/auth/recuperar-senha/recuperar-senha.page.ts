import { Component, OnInit } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  emailUser = "rcbjrcbj@gmail.com";
  codeNumber = null;
  stepNow = 1;

  constructor(
    private email: EmailComposer,
    private api: ApiService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ){}

  ngOnInit() {
  }

  // ENVIAR E-MAIL
  sendEmail()
  {
    if(this.emailUser == "")
    {
      this.toastSend("Digite o e-mail para ser enviado o código");
      return false;
    }
    else
    {
      let value = {
        email: this.emailUser
      }
      this.api.apiEmailNavaSenha(value).subscribe((res) => 
      {
        if(res["send"] == true)
        {
          this.codeNumber = res["code"]
          this.loadingToNextStep(2)
        }
        if(!res["send"])
        {
          this.toastSend(res["msg"]);
        }
      }, (e) => 
      {
        this.toastSend("Ocorreu um erro inesperado.");
      });
    }
  }


  // LOADING
  loadingToNextStep(step)
  {
    const load = this.loadCtrl.create({
      duration: 1400,
    }).then((res) => {
      res.present()
    });

    this.loadCtrl.dismiss().then(() => {
      this.stepNow = step
      console.log(this.stepNow)
    })

  }


  // TOAST
  toastSend(msg)
  {
    return this.toastCtrl.create({
      message: msg,
      color: "danger",
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

}
