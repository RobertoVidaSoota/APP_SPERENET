import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParamsOptions } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "https://sperenet-api.herokuapp.com/api"
  headers;
  // url:string = "http://127.0.0.1:8000/api"
  // pagamento:string = "https://sandbox.asaas.com/api/v3/"
  // token = ""
  

  constructor(
    private http: HttpClient
  ) { }

  ngOnInit()
  {
    this.headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
  }

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


  // -----------------------------------------------------------------------
  // ------------------------------- SHOP ----------------------------------
  // -----------------------------------------------------------------------

  apiBuscarUmProduto(value)
  {
    return this.http.post(this.url+"/post_one_product", value)
  }

  apiBuscarProdutoPorCategoria(value)
  {
    return this.http.post(this.url+"/post_catogory_product", value)
  }

  apiBuscarProdutosNovos()
  {
    return this.http.get(this.url+"/get_new_products")
  }

  apiBuscarProdutosPopulares()
  {
    return this.http.get(this.url+"/get_pop_products")
  }


  apiBuscarMaisProdutos()
  {
    return this.http.get(this.url+"/get_more_products")
  }

  apiBuscarCompras(value)
  {
    return this.http.post(this.url+"/post_purchases", value)
  }

  apiBuscarEspecificacaoComentario(value)
  {
    return this.http.post(this.url+"/post_page_product", value)
  }

  apiPostarComentario(value)
  {
    return this.http.post(this.url+"/post_coments", value)
  }

  apiBuscarDesejos(value)
  {
    return this.http.post(this.url+"/post_wishlist", value)
  }

  apiAdicionarDesejos(value)
  {
    return this.http.post(this.url+"/add_wishlist", value)
  }

  apiRemoverDesejo(value)
  {
    return this.http.post(this.url+"/remove_wishlist", value)
  }

  apiVerificarSeTaNaDesejos(value)
  {
    return this.http.post(this.url+"/check_wishlist", value)
  }

  apiPesquisarProduto(value)
  {
    return this.http.post(this.url+"/post_search", value)
  }


  // -----------------------------------------------------------------------
  // ------------------------------- CHECKOUT ------------------------------
  // -----------------------------------------------------------------------

  apiAdicionarCarrinho(value)
  {
    return this.http.post(this.url+"/post_add_cart", value)
  }

  apiVerificarSeTaCarrinho(value)
  {
    return this.http.post(this.url+"/post_verify_prod_chart", value)
  }

  apiRemoverCarrinho(value)
  {
    return this.http.post(this.url+"/post_remove_chart", value)
  }

  apiPegarCarrinho(value)
  {
    return this.http.post(this.url+"/post_cart", value)
  }

  apiMudarQuantidadeProduto(value)
  {
    return this.http.post(this.url+"/post_change_quantity_cart", value)
  }

  apiIniciarPagamento(value)
  {
    return this.http.post(this.url+"/post_payment", value)
  }

  apiEscolherPagamento(value)
  {
    return this.http.post(this.url+"/post_pay_method", value)
  }

  // PAGAR PAGSEGURO
  getSessionPagseguro()
  {
    return this.http.get(this.url+"/get_session_pagseguro");
  }
  finalPayment(bodyString)
  {
    return this.http.post(this.url+"/post_final_payment",
      bodyString, { headers: this.headers })
  }
  boletoPayment(bodyString)
  {
    return this.http.post(this.url+"/post_boleto_payment",
      bodyString, { headers: this.headers })
  }
  




  // PAGAMENTO ASAAS (interditado)

  // apiTransacaoComAsaas(value)
  // {
  //   return this.http.post(this.url+"/post_pay_transaction", value)
  // }

  // criarClienteAsaas(value)
  // {
  //   let headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'access_token': this.token
  //   });
    
  //   return this.http.post(this.pagamento+"customers", value, 
  //   {
  //     headers: headers
  //   })
  // }
}
