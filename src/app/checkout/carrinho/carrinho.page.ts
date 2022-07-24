import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { List } from 'postcss/lib/list';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinho:any = [];
  id_user = "";
  qtItems = 0;
  valorTotal = 0;
  valorTotalReal = "0"

  constructor(
    private api: ApiService,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit()
  {
    // VERIFICAR ID DO USUÁRIO LOGADO
    this.id_user = localStorage.getItem("id_usuario_logado_app") ?
    localStorage.getItem("id_usuario_logado_app") : "";

    // PEGAR PRODUTOS DO CARRINHO
    let bodyCarrinho = { id_user: parseInt(this.id_user) }
    if(this.id_user !== "")
    {
      this.api.apiPegarCarrinho(bodyCarrinho).subscribe((res) => 
      {
        if(res["success"] == true)
        {
          this.carrinho = res["carrinho"]
          let precoString;
          let dividir;
          let flutuar;
          let precoMultiplicado;
          let real;
          let precoProdutoAgora;
          for(let p = 0; p < this.carrinho.length; p++)
          {
            this.qtItems += this.carrinho[p]["quantidade_produto"]
            precoString = this.carrinho[p].preco_produto
            dividir = precoString.replace("R$", "")
            dividir = dividir.replace(",", ".")
            flutuar = parseFloat(dividir)
            precoMultiplicado = (flutuar)*(this.carrinho[p]["quantidade_produto"])
            this.valorTotal += precoMultiplicado
            real = this.valorTotal.toLocaleString('pt-br',
            {
              style: 'currency', 
              currency: 'BRL'
            });
            this.valorTotalReal = real
            precoProdutoAgora = precoMultiplicado.toLocaleString('pt-br',
            {
              style: 'currency', 
              currency: 'BRL'
            })
            this.carrinho[p].preco_produto = precoProdutoAgora
          }
        }
      },
      e => 
      {
        console.log(e)
      })
    }
  }


  // MUDAR QUANTIDADE DO PRODUTO
  changeQtProduto(id_produto, id_compra, direcao)
  {
    let value = 
    {
      id_produto: id_produto,
      id_compra: id_compra,
      direcao: direcao
    }
    
    this.api.apiMudarQuantidadeProduto(value).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        let precoString;
        let dividir;
        let flutuar;
        let precoMultiplicado;
        let real;
        let precoProdutoAgora;
        let valorSomadoPreco = 0;
        for(let p = 0; p < this.carrinho.length; p++)
        {
          if(this.carrinho[p].quantidade_produto >= 0)
          {
            if(this.carrinho[p].fk_id_produto == id_produto)
            {
              if(direcao === "frente")
              {
                this.qtItems += 1
                this.carrinho[p].quantidade_produto += 1
              }
              if(direcao === "traz")
              {
                this.qtItems -= 1
                this.carrinho[p].quantidade_produto -= 1
              }
              precoString = this.carrinho[p].preco_produto
              dividir = precoString.replace("R$", "")
              flutuar = parseFloat(dividir)
              precoMultiplicado = (flutuar)*(this.carrinho[p]["quantidade_produto"])
              valorSomadoPreco += precoMultiplicado
              this.valorTotal = valorSomadoPreco
              real = this.valorTotal.toLocaleString('pt-br',
              {
                style: 'currency', 
                currency: 'BRL'
              });
              this.valorTotalReal = real
              precoProdutoAgora = precoMultiplicado.toLocaleString('pt-br',
              {
                style: 'currency', 
                currency: 'BRL'
              })
              this.carrinho[p].preco_produto = precoProdutoAgora
            }
          }
        }
      }
    }, e => 
    {
      console.log(e)
    })
  }
}
