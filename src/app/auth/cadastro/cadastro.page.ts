import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

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

  constructor() { }

  ngOnInit() {
  }


  // VERIFICAR SE OS CAMPOS ESTÃO PREECHIDOS CORRETAMENTE
  checkInput()
  {

  }


  // ENVIAR OS DADOS DO CADASTRO
  sendRegister()
  {

  }

}
