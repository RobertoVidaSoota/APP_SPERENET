import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EmailComposer } from '@awesome-cordova-plugins/email-composer/ngx';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-recuperar-senha',
  templateUrl: './recuperar-senha.page.html',
  styleUrls: ['./recuperar-senha.page.scss'],
})
export class RecuperarSenhaPage implements OnInit {

  // VALORES DE ENVIAR E-MAIL PARA RECEBER O CÓDIGO
  emailUser = "";
  sended = null;

  // CODIGO RECEBIDO PARA SER CONFIRMADO
  codeNumberFromApi = "";

  // VALORES PARA ALTERAR A SENHA
  newPassword = "";
  confirmNewPassword = "";

  // VALOR DOS PASSOS PARA ALTERAR A SENHA
  stepNow = 1;

  // VALORES DOS CAMPOS
  codeNumber1 = ""; 
  codeNumber2 = ""; 
  codeNumber3 = ""; 
  codeNumber4 = ""; 
  codeNumber5 = ""; 
  codeNumber6 = ""; 

  // INPUT PEGOS PARA DAR O FOCO DEPOIS DE DIGITAR O NUMERO
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
    private loadCtrl: LoadingController,
    private nav: NavController
  ){}

  ngOnInit() {
  }

  // ENVIAR E-MAIL
  sendEmail()
  {
    if(this.emailUser == "")
    {
      this.toastSend("Digite o e-mail para ser enviado o código", "danger");
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
          this.codeNumberFromApi = res["code"]
          this.sended = res["send"]
          this.toastSend(res["msg"], "success");
        }
        if(!res["send"])
        {
          this.toastSend(res["msg"], "danger");
        }

        this.loadCtrl.dismiss()

      }, (e) => 
      {
        this.loadCtrl.dismiss()
        this.toastSend("Ocorreu um erro inesperado.", "danger");
      });
    }
  }


  // ENVIAR SENHA PARA A ALTERAÇÃO
  changePassword()
  {
    let value = {
      password: this.newPassword,
      email: this.emailUser
    }

    if(this.checkInputPassoword() == true)
    {

    }
    this.api.apiMudarNovaSenha(value).subscribe((res) => 
    {
      if(res["change"] && res["change"] == true)
      {
        this.toastSend(res["msg"], "success")
        this.nav.navigateRoot("/login")
      }
      else
      {
        this.toastSend(res["msg"], "danger")
      }
    }, e => 
    {
      this.toastSend("Ocorreu um erro inesperado.", "danger")
      this.loadCtrl.dismiss()
    })
  }


  // VERIFICAR SE OS VALORES DA SENHA ESTÃO VAZIOS
  checkInputPassoword():Boolean
  {
    if(this.newPassword == "")
    {
      this.toastSend("O campo nova senha deve ser obrigatório.", "danger")
      return false;
    }
    else if(this.confirmNewPassword == "")
    {
      this.toastSend("O campo confirmar nova senha deve ser obrigatório.", "danger")
      return false;
    }
    else if(this.newPassword.length < 8)
    {
      this.toastSend("O campo nova senha deve ter pelo menos 8 caracteres.", "danger")
      return false;
    }
    else if(this.confirmNewPassword.length < 8)
    {
      this.toastSend("O campo confirmar nova senha deve ter pelo menos 8 caracteres.", "danger")
      return false;
    }

    return true;
  }


  // VERIFICAR O TAMANHO DOS INPUTS DA SENHA
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

  // ENVIAR CÓDIGO PARA UMA NOVA SENHA
  codeValidate()
  {
    let codeFinal = 
      this.codeNumber1+""+
      this.codeNumber2+""+
      this.codeNumber3+""+
      this.codeNumber4+""+
      this.codeNumber5+""+
      this.codeNumber6;

    if(this.codeNumberFromApi == codeFinal)
    {
      this.loadingToNextStep(3)
      setTimeout(() => {
        this.loadCtrl.dismiss()
      }, 1500)
    }
    else
    {
      this.toastSend("O Código é inválido.", "danger")
    }
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
        this.codeNumberRef_1.nativeElement.focus()
      })
    });
  }


  // TOAST
  toastSend(msg, color)
  {
    return this.toastCtrl.create({
      message: msg,
      color: color,
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
