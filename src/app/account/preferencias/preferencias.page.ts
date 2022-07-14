import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.page.html',
  styleUrls: ['./preferencias.page.scss'],
})
export class PreferenciasPage implements OnInit {

  promocoesToggle:Boolean = true
  novidadesToggle:Boolean = true
  atualizacoesToggle:Boolean = false
  pedidosToggle:Boolean = false

  formRegister = {
    id_user: "",
    promocoes: "",
    novidades: "",
    atualizacoes: "",
    pedidos: ""
  }
  constructor(
    private api: ApiService
  ) { }

  ngOnInit()
  {
    
  }


  ionViewWillEnter()
  {
    // IDA DO USUÁRIO
    this.formRegister.id_user = localStorage.getItem("id_usuario_logado_app") ? 
    localStorage.getItem("id_usuario_logado_app") : "";

    // PEGAR NOTIFICAÇÕES DO USUARIO
    this.api.apiBuscarNotificacoes(this.formRegister).subscribe((res) => 
    {
      this.formRegister.promocoes = res["data"]["0"]["promocoes"];
      this.formRegister.atualizacoes = res["data"]["0"]["atualizacoes"];
      this.formRegister.novidades = res["data"]["0"]["novidades"];
      this.formRegister.pedidos = res["data"]["0"]["pedidos"];

      // CONFIGURAR TOGGLES DE ACORDO COM O VALOR Y/N
      if(this.formRegister.promocoes == "Y"){this.promocoesToggle = true}
      else{this.promocoesToggle = false}

      if(this.formRegister.atualizacoes == "Y"){this.atualizacoesToggle = true}
      else{this.atualizacoesToggle = false}

      if(this.formRegister.novidades == "Y"){this.novidadesToggle = true}
      else{this.novidadesToggle = false}

      if(this.formRegister.pedidos == "Y"){this.pedidosToggle = true}
      else{this.pedidosToggle = false}
    },e =>
    {
      console.log(e)
    })

    
  }


  // ALTERAR NOTIFICAÇÕES DO USUARIO
  sendNotifications(e)
  {
    if(e.target.id == "promocoes")
    {this.formRegister.promocoes = e.detail.checked ? "Y" : "N"}

    if(e.target.id == "atualizacoes")
    {this.formRegister.atualizacoes = e.detail.checked ? "Y" : "N"}

    if(e.target.id == "novidades")
    {this.formRegister.novidades = e.detail.checked ? "Y" : "N"}

    if(e.target.id == "pedidos")
    {this.formRegister.pedidos = e.detail.checked ? "Y" : "N"}

    this.api.apiMudarNotificacoes(this.formRegister).subscribe((res) => 
    {
      if(res["update"] == true)
      {
        console.log("deu certo")
      }
      else if(res["update"] == false)
      {
        console.log("deu errado")
      }
    },e =>
    {
      console.log(e)
    })
  }

}
