import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
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
    private toastCrtl: ToastController,
    private nav: NavController,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit()
  {
    let DataHoje = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

    this.dataMaxima = DataHoje
  }


  // ENVIAR OS DADOS DO CADASTRO
  sendRegister()
  {

    if(this.checkInput() == true)
    {
      this.api.apiCadastrar(this.formRegister).subscribe((res) => 
      {
        if(res["register"] && res["register"])
        {
          this.loading()
          localStorage.setItem("login_usuario", "true")
          localStorage.setItem("id_usuario_logado_app", res["user"]["id"])
          setTimeout(() => {
            this.loadCtrl.dismiss()
            this.toastConfirm(res["msg"])
            this.nav.navigateRoot("/tabs")
          })
        }
      }, e => 
      {
        this.toastRegister("Ocorreu um erro inesperado")
      })
    }
    
  }


  // VERIFICAR SE OS CAMPOS ESTÃO PREECHIDOS CORRETAMENTE
  checkInput():Boolean
  {
    // OBRIGATÓRIO
    if(this.formRegister.nome_usuario == "")
    {
      this.toastRegister("O campo nome deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.password == "")
    {
      this.toastRegister("O campo senha deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.confirmPassword == "")
    {
      this.toastRegister("O campo confirmar senha deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.confirmPassword !== this.formRegister.password)
    {
      this.toastRegister("O campo confirmar senha deve ser igual a senha.")
      return false;
    }
    else if(this.formRegister.email == "")
    {
      this.toastRegister("O campo email deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.email.indexOf("@") < 0)
    {
      this.toastRegister("O email não pode ficar sem o @.")
      return false;
    }
    else if(this.formRegister.telefone == "")
    {
      this.toastRegister("O campo telefone deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.cpf == "")
    {
      this.toastRegister("O campo CPF deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.nascimento == "")
    {
      this.toastRegister("O campo data de nascimento deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.cep == "")
    {
      this.toastRegister("O campo CEP deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.pais == "")
    {
      this.toastRegister("O campo pais deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.uf == "")
    {
      this.toastRegister("O campo estado deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.cidade == "")
    {
      this.toastRegister("O campo cidade deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.bairro == "")
    {
      this.toastRegister("O campo bairro deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.rua == "")
    {
      this.toastRegister("O campo rua deve ser obrigatório.")
      return false;
    }
    else if(this.formRegister.numero == "")
    {
      this.toastRegister("O campo numero da casa deve ser obrigatório.")
      return false;
    }

    // VALOR MINIMO

    else if(this.formRegister.nome_usuario.length < 10)
    {
      this.toastRegister("O campo nome deve ter pelo menos 10 caracteres.")
      return false;
    }
    else if(this.formRegister.password.length < 8)
    {
      this.toastRegister("O campo senha deve ter pelo menos 8 caracteres.")
      return false;
    }
    else if(this.formRegister.confirmPassword.length < 8)
    {
      this.toastRegister("O campo confirmar senha deve ter pelo menos 8 caracteres.")
      return false;
    }
    else if(this.formRegister.telefone.length < 9)
    {
      this.toastRegister("O campo telefone deve ter pelo menos 9 caracteres.")
      return false;
    }
    else if(this.formRegister.cpf.length < 11)
    {
      this.toastRegister("O campo CPF deve ter pelo menos 11 caracteres.")
      return false;
    }
    else if(this.formRegister.nascimento.length < 10)
    {
      this.toastRegister("O campo data de nascimento deve ter pelo menos 10 caracteres.")
      return false;
    }
    else if(this.formRegister.cep.length < 8)
    {
      this.toastRegister("O campo CEP deve ter pelo menos 8 caracteres.")
      return false;
    }
    else if(this.formRegister.pais.length < 3)
    {
      this.toastRegister("O campo país deve ter pelo menos 3 caracteres.")
      return false;
    }
    else if(this.formRegister.uf.length < 2)
    {
      this.toastRegister("O campo estado deve ter pelo menos 2 caracteres.")
      return false;
    }
    else if(this.formRegister.cidade.length < 4)
    {
      this.toastRegister("O campo cidade deve ter pelo menos 4 caracteres.")
      return false;
    }
    else if(this.formRegister.bairro.length < 3)
    {
      this.toastRegister("O campo bairro deve ter pelo menos 3 caracteres.")
      return false;
    }
    else if(this.formRegister.rua.length < 3)
    {
      this.toastRegister("O campo rua deve ter pelo menos 3 caracteres.")
      return false;
    }
    else if(this.formRegister.numero.length < 1)
    {
      this.toastRegister("O campo numero da casa deve ter pelo menos 1 caracteres.")
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
    }).then((res) => {
      res.present()
    })
  }


  toastConfirm(msg)
  {
    return this.toastCrtl.create({
      message: msg,
      color: "success",
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
