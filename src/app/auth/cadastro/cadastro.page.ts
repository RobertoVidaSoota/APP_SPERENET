import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage{

  formRegister = {
    email: "",
    password: "",
    confirmPassword: "",
    nome_usuario: "",
    telefone: "",
    cpf: "",
    nascimento: "",
    cep: "",
    pais: "",
    uf: "",
    cidade: "",
    bairro: "",
    rua: "",
    numero: "",
  }

  completarEndereco: Boolean;
  enderecoCapturado;

  constructor(
    private api: ApiService,
    private toastCrtl: ToastController
  ) { }

  ngOnInit() {
  }


  // ENVIAR OS DADOS DO CADASTRO
  sendRegister()
  {

  }


  // VERIFICAR SE OS CAMPOS ESTÃO PREECHIDOS CORRETAMENTE
  checkInput()
  {

  }


  // PEGAR ENDEREÇO PELO CEP
  getAndress()
  {
    let value = this.formRegister.cep
    this.api.viaCepBuscarEndereco(value).subscribe((res) => 
    {
      this.enderecoCapturado = res
      this.toast()
    })
    
  }


  // TORRADA DE MENSSAGEM
  toast()
  {
    return this.toastCrtl.create({
      cssClass: "toast-button-color-confirm",
      message: "Pegar endereço automaticamente ?",
      buttons: [
        {
          text: "não",
          role: "cancel",
          handler: () => 
          {
            this.toastCrtl.dismiss()
          }
        },
        {
          text: "sim",
          handler: () => 
          {
            this.formRegister.cidade = this.enderecoCapturado.localidade
            this.formRegister.bairro = this.enderecoCapturado.bairro
            this.formRegister.uf = this.enderecoCapturado.uf
            this.formRegister.rua = this.enderecoCapturado.logradouro

            this.toastCrtl.dismiss()
          }
        }
      ],
      duration: 8000
    }).then((res) => {
      res.present()
    })
  }

}
