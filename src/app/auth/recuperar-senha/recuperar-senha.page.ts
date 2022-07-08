import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { LoadingController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  emailUser = "";
  codeNumberFormApi = null;
  sended = null;
  stepNow = 2;

  codeNumber1 = ""
  codeNumber2 = ""
  codeNumber3 = ""
  codeNumber4 = ""
  codeNumber5 = ""
  codeNumber6 = ""

  @ViewChild("codeNumberRef_1") codeNumberRef_1: ElementRef;
  @ViewChild("codeNumberRef_2") codeNumberRef_2: ElementRef;
  @ViewChild("codeNumberRef_3") codeNumberRef_3: ElementRef;
  @ViewChild("codeNumberRef_4") codeNumberRef_4: ElementRef;
  @ViewChild("codeNumberRef_5") codeNumberRef_5: ElementRef;
  @ViewChild("codeNumberRef_6") codeNumberRef_6: ElementRef;

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

      this.loadingToNextStep(2)
      
      this.api.apiEmailNovaSenha(value).subscribe((res) => 
      {
        if(res["send"] == true)
        {
          this.codeNumberFormApi = res["code"]
          this.sended = res["send"]
        }
        if(!res["send"])
        {
          this.toastSend(res["msg"]);
        }

        this.loadCtrl.dismiss()

      }, (e) => 
      {
        this.loadCtrl.dismiss()
        this.toastSend("Ocorreu um erro inesperado.");
      });
    }
  }


  // ENVIAR CÓDIGO PARA UMA NOVA SENHA
  codeValidate()
  {
    
  }


  // IR PRO PROXIMO NUMERO
  nextNumber(e, number)
  {
    let value = e.target.value

    if(value)
    {      
      if(number == '1'){ this.codeNumberRef_2.nativeElement.focus() }
      if(number == '2'){ this.codeNumberRef_3.nativeElement.focus() }
      if(number == '3'){ this.codeNumberRef_4.nativeElement.focus() }
      if(number == '4'){ this.codeNumberRef_5.nativeElement.focus() }
      if(number == '5'){ this.codeNumberRef_6.nativeElement.focus() }
    }
  }


  // LOADING
  async loadingToNextStep(step)
  {
    const load = await this.loadCtrl.create({
      cssClass: "my-loading-class",
    }).then((load) => {
      load.present()

      load.onDidDismiss().then(() => {
        this.stepNow = step
      })
    });
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
