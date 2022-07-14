import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParamsOptions } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://127.0.0.1:8000/api"
  

  constructor(
    private http: HttpClient
  ) { }

  // PEGAR SESSÃO DA TRANSAÇÃO
  // getSessionPagseguro()
  // {
  //   return this.http.get(this.url+"/get_session_pagseguro");
  // }
  // PAGAMENTO CARTÃO
  // paymentCard(body:any)
  // {    
  //   return this.http.post(this.url, body);
  // }



  // --------------------------------------------------------------------
  // ------------------------------- AUTH ------------------------------- 
  // --------------------------------------------------------------------

  apiFazerLogin(formValue)
  {
    return this.http.post(this.url+"/post_login_user", formValue);
  }

  apiCadastrar(formValue)
  {
    return this.http.post(this.url+"/post_register_user", formValue)
  }

  viaCepBuscarEndereco(value)
  {
    return this.http.get("https://viacep.com.br/ws/"+value+"/json/")
  }

  apiEmailNovaSenha(value)
  {
    return this.http.post(this.url+"/post_send_email_new_password", value);
  }

  apiMudarNovaSenha(value)
  {
    return this.http.post(this.url+"/post_new_password", value);
  }


  // -----------------------------------------------------------------------
  // ------------------------------- ACCOUNT ------------------------------- 
  // -----------------------------------------------------------------------

  apiBuscarPerfilConta(value)
  {
    return this.http.get(this.url+"/get_info_account/"+value+"")
  }

  apiAtualizarInfoPessoais(value)
  {
    return this.http.post(this.url+"/post_change_info_account", value)
  }

  apiAtualizarEmail(value)
  {
    return this.http.post(this.url+"/post_change_email", value)
  }

  apiAtualizarSenha(value)
  {
    return this.http.post(this.url+"/post_change_password", value)
  }

  apiBuscarNotificacoes(value)
  {
    return this.http.post(this.url+"/post_get_user_notification", value)
  }

  apiMudarNotificacoes(value)
  {
    return this.http.post(this.url+"/post_change_user_notification", value)
  }
}
