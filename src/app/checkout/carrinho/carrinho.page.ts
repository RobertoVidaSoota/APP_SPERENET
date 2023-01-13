import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
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
  id_compra:number;
  qtItems = 0;
  valorTotal = 0;
  valorTotalReal = "0"

  constructor(
    private api: ApiService,
    private alert: AlertController,
    private toast: ToastController,
    private router: Router
  ) { }

  ngOnInit(){}


  ionViewWillEnter()
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
            if(res["carrinho"][p]["status"] !== "carrinho"){ return }
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
          this.id_compra = res["carrinho"][0]["fk_id_compras"]
        }else
        {
          this.carrinho = []
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
          let real;
          let precoProdutoAgora;
          for(let p = 0; p < this.carrinho.length; p++)
          {
            if(this.carrinho[p].fk_id_produto == id_produto)
            {
              if(this.carrinho[p].quantidade_produto > 0)
              {
                // RECEBE O PREÇO E CONVERTE PARA FLOAT
                precoString = this.carrinho[p].preco_produto
                dividir = precoString.replace("R$", "")
                dividir = dividir.replace(".", "")
                tiraVirgula = dividir.replace(",", ".")
                flutuar = parseFloat(tiraVirgula)

                // CALCULA O PRECO DO PRODUTO E DO CARRINHO E MANDA PRO ARRAY

                precoNormal = (flutuar) / (this.carrinho[p].quantidade_produto)

                if(direcao === "traz")
                {
                  flutuar -= precoNormal
                  this.valorTotal -= precoNormal
                }
                if(direcao === "frente")
                {
                  flutuar += precoNormal
                  this.valorTotal += precoNormal
                }

                real = this.valorTotal.toLocaleString('pt-br',
                {
                  style: 'currency', 
                  currency: 'BRL'
                });
                this.valorTotalReal = real
                precoProdutoAgora = flutuar.toLocaleString('pt-br',
                {
                  style: 'currency', 
                  currency: 'BRL'
                })
                this.carrinho[p].preco_produto = precoProdutoAgora

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


  // PÁGINA DE PAGAMENTO
  pagar(valorTotalReal)
  {
    let valorTotalIntDol
    valorTotalIntDol = valorTotalReal.replace("R$", "")
    valorTotalIntDol = valorTotalIntDol.replace(".", "")
    valorTotalIntDol = valorTotalIntDol.replace(",", ".")
    valorTotalIntDol = parseFloat(valorTotalIntDol)
    let id_user = parseInt(this.id_user)
    let body = 
    {
      id_compra: this.id_compra,
      id_user: id_user,
      valorTotal: valorTotalIntDol
    }
    this.api.apiIniciarPagamento(body).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        let compraParam: NavigationExtras = 
        {
          queryParams: { id: body.id_compra}
        }
        this.router.navigate(["/pagamento"], compraParam)
      }
      else
      {
        this.toastBox("Ocorreu um erro ineperado", "danger")
      }
    }, 
    e =>
    {
      this.toastBox("Ocorreu um erro ineperado", "danger")
      console.log(e)
    })
  }

  // REMOVER DO CARRINHO
  removeCart(id)
  {
    let id_compra = localStorage.getItem("id_compra_atual")
    let body = 
    {
      id_compra: id_compra,
      id_produto: id
    }
    this.api.apiRemoverCarrinho(body).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        this.toastBox("Removido do carrinho", "success")
        this.qtItems = 0;
        this.valorTotal = 0
        this.valorTotalReal = "0"
        this.ionViewWillEnter()
      }
    }, 
    e => 
    {
      this.toastBox("Ocorreu um erro inesperado", "danger") 
      console.log(e)
    })
  }




  // TORRADA DE MENSAGEM
  toastBox(msg, color) 
  {
    return this.toast.create({
      message: msg,
      color: color,
      position: "top", 
      duration: 2000
    }).then((t) => 
    {
      t.present()
    });
  }

  
  // ALERTA DE ESCOLHA
  alerta(page)
  {
    return this.alert.create({
      header: "Deseja remover esse item ?",
      buttons: 
      [
        {
          text: "Sim",
          role: "confirm",
          handler:() =>
          {
            this.removeCart(page)
          }
        },
        {
          text: "Não",
          role: "cancel"
        }
      ]
    })
    .then((a) => 
    {
      a.present()
    })
  }
    
}
