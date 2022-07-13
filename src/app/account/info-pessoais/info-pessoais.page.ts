import { Component, Input, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-info-pessoais',
  templateUrl: './info-pessoais.page.html',
  styleUrls: ['./info-pessoais.page.scss'],
})
export class InfoPessoaisPage implements OnInit {

  formRegister = {
    id_user: "",
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

  dataMaxima;

  constructor(
    private api: ApiService,
    private toastCrtl: ToastController,
    private nav: NavController,
    private loadCtrl: LoadingController
  ) { }

  ngOnInit(){
  }

  ionViewDidEnter()
  {
    // FOCAR NO PRIMEIRO IMPUT
    let input = document.getElementById("nome_usuario")
    input.focus()

    // DATA DE HOJE PARA DEFINIR O LIMITE DATA DE NASCIMENTO
    let DataHoje = new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0];

    this.dataMaxima = DataHoje
  }


  ionViewWillEnter()
  {
    this.formRegister.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";

    this.api.apiBuscarPerfilConta(this.formRegister.id_user).subscribe((res) => 
    {
      console.log(res["data"]["0"])
      this.formRegister.nome_usuario = res["data"]["0"]["info_pessoais"]["nome_usuario"]
      this.formRegister.telefone = res["data"]["0"]["info_pessoais"]["telefone"]
      this.formRegister.cpf = res["data"]["0"]["info_pessoais"]["cpf"]
      this.formRegister.nascimento = res["data"]["0"]["info_pessoais"]["nascimento"]
      this.formRegister.cep = res["data"]["0"]["endereco"]["cep"]
      this.formRegister.pais = res["data"]["0"]["endereco"]["pais"]
      this.formRegister.uf = res["data"]["0"]["endereco"]["uf"]
      this.formRegister.cidade = res["data"]["0"]["endereco"]["cidade"]
      this.formRegister.bairro = res["data"]["0"]["endereco"]["bairro"]
      this.formRegister.rua = res["data"]["0"]["endereco"]["rua"]
      this.formRegister.numero = res["data"]["0"]["endereco"]["numero"]
    },e => 
    {
      console.log(e)
    })
    
  }


  // ENVIAR OS DADOS DO CADASTRO
  sendUpdate()
  {

    if(this.checkInput() == true)
    {
      this.api.apiAtualizarInfoPessoais(this.formRegister).subscribe((res) => 
      {
        if(res["update"] == true)
        {
          this.loading()
          setTimeout(() => {
            this.loadCtrl.dismiss()
            this.toastConfirm(res["msg"])
          })
        }
        else if(res["update"] == false)
        {
          this.toastRegister(res["msg"])
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


  // TOAST
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
