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
  valor

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
    for(let p = 0; p < this.carrinho.length; p++)
    {
      if(this.carrinho[p].fk_id_produto == id_produto)
      {
        if(this.carrinho[p].quantidade_produto == 1)
        {
          if(value.direcao == "traz")
          {
            return false;
          }
        }
      }
    }
    
    setTimeout(() => 
    {
      this.api.apiMudarQuantidadeProduto(value).subscribe((res) => 
      {
        if(res["success"] == true)
        {
          let precoString;
          let dividir;
          let tiraVirgula;
          let flutuar:any;
          let precoNormal;
          let precoMultiplicado;
          let real;
          let precoProdutoAgora;
          for(let p = 0; p < this.carrinho.length; p++)
          {
            if(this.carrinho[p].fk_id_produto == id_produto)
            {
              if(this.carrinho[p].quantidade_produto > 0)
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
              
                // RECEBE O PREÇO E CONVERTE PARA FLOAT
                precoString = this.carrinho[p].preco_produto
                dividir = precoString.replace("R$", "")
                dividir = dividir.replace(".", "")
                tiraVirgula = dividir.replace(",", ".")
                flutuar = parseFloat(tiraVirgula)

                // CALCULA O PRECO DO PRODUTO E DO CARRINHO E MANDA PRO ARRAY
                flutuar = flutuar * 100
                flutuar = parseInt(flutuar)
                precoNormal = (flutuar / this.carrinho[p].quantidade_produto) / 100
                // ---- ATÉ AQUI PEGOU
                console.log(precoNormal)
                
                // if(direcao === "frente")
                // {
                //   precoMultiplicado = 
                //   (precoNormal*this.carrinho[p].quantidade_produto)+precoNormal
                //   this.valorTotal += precoNormal
                // }
                // if(direcao === "traz")
                // {
                //   if(this.carrinho[p].quantidade_produto == 1)
                //   {
                //     precoMultiplicado = 
                //     (precoNormal*this.carrinho[p].quantidade_produto) / 2
                //     this.valorTotal -= precoNormal
                //   }
                //   else
                //   {
                //     precoMultiplicado = 
                //     ((precoNormal)*(this.carrinho[p].quantidade_produto))-precoNormal
                //     this.valorTotal -= precoNormal
                //   }
                // }
                // real = this.valorTotal.toLocaleString('pt-br',
                // {
                //   style: 'currency', 
                //   currency: 'BRL'
                // });
                // this.valorTotalReal = real
                // precoProdutoAgora = precoMultiplicado.toLocaleString('pt-br',
                // {
                //   style: 'currency', 
                //   currency: 'BRL'
                // })
                // this.carrinho[p].preco_produto = precoProdutoAgora
              }
              else
              {
                return;
              }
            }
          }
        }
      }, e => 
      {
        console.log(e)
      })
    }, 100)
  }
    
}
