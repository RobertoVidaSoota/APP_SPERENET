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

  enderecoCapturado;
  enderecoPronto:Boolean;
  dataMaxima;

  constructor(
    private api: ApiService,
    private toastCrtl: ToastController
  ) { }

  ngOnInit()
  {
    let DataHoje = new Date()
    let dia = DataHoje.getDate()
    let mes = DataHoje.getMonth() + 1
    let ano = DataHoje.getFullYear()

    this.dataMaxima = dia+"/"+mes+"/"+ano
  }


  // ENVIAR OS DADOS DO CADASTRO
  sendRegister()
  {
    
  }


  // VERIFICAR SE OS CAMPOS ESTÃO PREECHIDOS CORRETAMENTE
  checkInput():Boolean
  {
    if(this.formRegister.nome_usuario == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.password == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.confirmPassword == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.confirmPassword !== this.formRegister.password)
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email.indexOf("@") < 0)
    {
      this.toastRegister("O email não pode ficar sem o @")
      return false;
    }
    else if(this.formRegister.telefone == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.pais == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("")
      return false;
    }
    else if(this.enderecoPronto == false)
    {
      this.toastRegister("Endereco não encontrado")
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


  // PEGAR ENDEREÇO PELO CEP
  getAndress()
  {
    let value = this.formRegister.cep
    this.api.viaCepBuscarEndereco(value).subscribe((res) => 
    {
      this.enderecoCapturado = res
      this.enderecoPronto = true
      this.toastAdress()
    }, e => {
      this.enderecoPronto = false
      this.toastRegister("Endereco não encontrado")
    })
  }


  // TORRADA DE MENSSAGEM
  toastAdress()
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


  toastRegister(msg)
  {
    return this.toastCrtl.create({
      message: msg,
      color: "danger",
      buttons: [
        {
          text: "x",
          role: "cancel" 
        }
      ],
      duration: 5000
    })
  }

}
