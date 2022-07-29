import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, ToastController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage{

  inputComentarioFadeIn = true;
  
  @ViewChild(".input_comentario") inputComentario;

  checkLogin = "";

  dadosProdutos = [];
  especificacoes = [];
  comentarios = [];
  inputPostComentario = "";

  qtStarComent = 5.0;
  estrelasCheias = [1,2,3,4,5]
  estrelasMedias = []
  estrelasVazias = []

  coracaoCor = "cinzaIcone"
  carrinhoCor = "cinzaIcone"
  compartilharCor = "cinzaIcone"

  constructor(
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private toast: ToastController,
    private api: ApiService
  )
  {
  }
  
  // FUNÇÃO PARA COLOCAR EM TODAS AS PÁGINAS SECUNDÁRIAS DAS ABAS
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button")   
    var navVar = this.navCtrl;

    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      if(myTab == "tab1")
      {
        navVar.navigateRoot("/tabs/tab1/inicio");
      }
    });
    

    // VERIFICAR USUARIO LOGADO
    this.checkLogin = localStorage.getItem("login_usuario") ?
    localStorage.getItem("login_usuario") : "";

    // PEGAR O PRODUTO
    this.actRoute.queryParams.subscribe((res) => 
    {
      this.dadosProdutos.push(JSON.parse(res["produto"]))
    },
    e => 
    {
      console.log(e)
    })


    // BUSCAR ESPECIFICAÇÕES E COMANTÁRIOS
    this.api.apiBuscarEspecificacaoComentario({product_id:this.dadosProdutos[0]["id"]})
    .subscribe((res) =>
    {
      this.especificacoes = res["data"]["especificacoes"]
      this.comentarios = res["data"]["comentarios"]
    },
    e => {
      console.log(e)
    })

    // VERIFICAR SE O PRODUTO ESTAR NA LISTA DEDESEJOS
    let id_user = localStorage.getItem("id_usuario_logado_app")

    if(id_user == undefined){return}

    let valueDesejo = 
    {
      id_produto: this.dadosProdutos[0].id,
      id_user: parseInt(id_user)
    }
    this.api.apiVerificarSeTaNaDesejos(valueDesejo).subscribe((res) => 
    {
      if(res["msg"] === "Deu certo")
      {
        if(res["produto"][0])
        {
          this.coracaoCor = "vermelhoIcone"
        }
        else
        {
          this.coracaoCor = "cinzaIcone"
        }
      }
      else
      {
        this.coracaoCor = "cinzaIcone"
      }
    },
    e => 
    {
      console.log(e)
      this.coracaoCor = "cinzaIcone"
    })


    // VERIFICAR SE PRODUTOS TA NO CARRINHO
    let id_compra = localStorage.getItem("id_compra_atual");
    if(id_compra)
    {
      let valorVerCarrinho = 
      {
        id_produto: this.dadosProdutos[0].id,
        id_compra: id_compra
      }
      this.api.apiVerificarSeTaCarrinho(valorVerCarrinho).subscribe((res) => 
      {
        if(res["success"] == true)
        {
          this.carrinhoCor = "cinzaIcone"
        }
        else
        {
          this.carrinhoCor = "vermelhoIcone"
        }
      },
      e => 
      {
        this.carrinhoCor = "cinzaIcone"
        console.log(e)
      })
    }
  }




  // ADICIONAR A LISTA DE DESEJOS
  addWishList()
  {
    let id_user = localStorage.getItem("id_usuario_logado_app")
    let body = 
    {
      id_user: parseInt(id_user),
      id_produto: this.dadosProdutos[0].id
    }

    if(id_user == undefined)
    {
      this.toast.create({
        message: "Voce precisa está logado para realizar esta ação.",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
      return;
    }

    this.api.apiAdicionarDesejos(body).subscribe((res) => 
    {
      if(res["msg"] === "Deu certo")
      {
        if(res["data"] !== "")
        {
          this.coracaoCor = "vermelhoIcone"
          this.toast.create({
            message: "Adicionado à sua lista de desejos",
            position: "top",
            color: "success",
            duration: 2000
          }).then((t) => { t.present() })
        }
        else
        {
          this.toast.create({
            message: "Ocorreu um erro inesperado",
            position: "top",
            color: "danger",
            duration: 2000
          }).then((t) => { t.present() })
        }
      }    
    },
    e => 
    {
      this.toast.create({
        message: "Ocorreu um erro inesperado",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
      console.log(e)
    })
  }


  // REMOVER DA LISTA DE DESEJOS
  removeWishList()
  {
    let id_user = localStorage.getItem("id_usuario_logado_app")
    let body = 
    {
      id_user: parseInt(id_user),
      id_produto: this.dadosProdutos[0].id
    }
    this.api.apiRemoverDesejo(body).subscribe((res) => 
    {
      if(res["msg"] === "Deu certo")
      {
        if(res["data"] !== "")
        {
          this.coracaoCor = "cinzaIcone"
          this.toast.create({
            message: "Removido à sua lista de desejos",
            position: "top",
            color: "success",
            duration: 2000
          }).then((t) => { t.present() })
        }
        else
        {
          this.toast.create({
            message: "Ocorreu um erro inesperado",
            position: "top",
            color: "danger",
            duration: 2000
          }).then((t) => { t.present() })
        }
      }
    },
      e => 
    {
      this.toast.create({
        message: "Ocorreu um erro inesperado",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
      console.log(e)
    })
  }




  // POSTAR COMENTARIO
  postComent()
  {
    let id_user = localStorage.getItem("id_usuario_logado_app")
    let body = 
    {
      id_user: parseInt(id_user),
      id_produto: this.dadosProdutos[0].id,
      comentario: this.inputPostComentario,
      estrelas: this.qtStarComent
    }
    console.log(body)
    this.api.apiPostarComentario(body).subscribe((res) =>
    {
      if(res["msg"])
      {
        this.toast.create({
            message: res["msg"],
            position: "top",
            color: "danger",
            duration: 2000
          }).then((t) => { t.present() })
        if(res["comentario"])
        {
          this.comentarios.unshift(res["comentario"])

          this.toast.create({
            message: res["msg"],
            position: "top",
            color: "success",
            duration: 2000
          }).then((t) => { t.present() })

          this.inputComentarioFadeIn = !this.inputComentarioFadeIn;
        }
      }
    },e => 
    {
      this.toast.create({
        message: "Ocorreu um erro inesperado",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
    })
  }

  
  // ALMENTAR AS ESTRELAS NA POSTAGEM 
  nextStar()
  {
    this.qtStarComent += 0.5

    if(this.qtStarComent > 5.0)
    {
      this.qtStarComent -= 0.5
    }
    if(this.qtStarComent == 5.0)
    {
      this.estrelasCheias = [1,2,3,4,5]
      this.estrelasMedias = []
      this.estrelasVazias = []
    }
    else if(this.qtStarComent == 4.5)
    {
      this.estrelasCheias = [1,2,3,4]
      this.estrelasMedias = [1]
      this.estrelasVazias = []
    }
    else if(this.qtStarComent == 4.0)
    {
      this.estrelasCheias = [1,2,3,4]
      this.estrelasMedias = []
      this.estrelasVazias = [1]
    }
    else if(this.qtStarComent == 3.5)
    {
      this.estrelasCheias = [1,2,3]
      this.estrelasMedias = [1]
      this.estrelasVazias = [1]
    }
    else if(this.qtStarComent == 3.0)
    {
      this.estrelasCheias = [1,2,3]
      this.estrelasMedias = []
      this.estrelasVazias = [1,2]
    }
    else if(this.qtStarComent == 2.5)
    {
      this.estrelasCheias = [1,2]
      this.estrelasMedias = [1]
      this.estrelasVazias = [1,2]
    }
    else if(this.qtStarComent == 2.0)
    {
      this.estrelasCheias = [1,2]
      this.estrelasMedias = []
      this.estrelasVazias = [1,2,3]
    }
    else if(this.qtStarComent == 1.5)
    {
      this.estrelasCheias = [1]
      this.estrelasMedias = [1]
      this.estrelasVazias = [1,2,3]
    }
    else if(this.qtStarComent == 1.0)
    {
      this.estrelasCheias = [1]
      this.estrelasMedias = []
      this.estrelasVazias = [1,2,3,4]
    }
    else if(this.qtStarComent == 0.5)
    {
      this.estrelasCheias = []
      this.estrelasMedias = [1]
      this.estrelasVazias = [1,2,3,4]
    }
    else if(this.qtStarComent == 0)
    {
      this.estrelasCheias = []
      this.estrelasMedias = []
      this.estrelasVazias = [1,2,3,4,5]
    }
    else if(this.qtStarComent < 0)
    {
      this.qtStarComent += 0.5
    }
  }


  // DIMINUIR AS ESTRELAS NA POSTAGEM
  prevStar()
  {
    this.qtStarComent -= 0.5

    if(this.qtStarComent > 5.0)
    {
      this.qtStarComent -= 0.5
    }
    if(this.qtStarComent == 5.0)
    {
      this.estrelasCheias = [1,2,3,4,5]
      this.estrelasMedias = []
      this.estrelasVazias = []
    }
    else if(this.qtStarComent == 4.5)
    {
      this.estrelasCheias = [1,2,3,4]
      this.estrelasMedias = [1]
      this.estrelasVazias = []
    }
    else if(this.qtStarComent == 4.0)
    {
      this.estrelasCheias = [1,2,3,4]
      this.estrelasMedias = []
      this.estrelasVazias = [1]
    }
    else if(this.qtStarComent == 3.5)
    {
      this.estrelasCheias = [1,2,3]
      this.estrelasMedias = [1]
      this.estrelasVazias = [1]
    }
    else if(this.qtStarComent == 3.0)
    {
      this.estrelasCheias = [1,2,3]
      this.estrelasMedias = []
      this.estrelasVazias = [1,2]
    }
    else if(this.qtStarComent == 2.5)
    {
      this.estrelasCheias = [1,2]
      this.estrelasMedias = [1]
      this.estrelasVazias = [1,2]
    }
    else if(this.qtStarComent == 2.0)
    {
      this.estrelasCheias = [1,2]
      this.estrelasMedias = []
      this.estrelasVazias = [1,2,3]
    }
    else if(this.qtStarComent == 1.5)
    {
      this.estrelasCheias = [1]
      this.estrelasMedias = [1]
      this.estrelasVazias = [1,2,3]
    }
    else if(this.qtStarComent == 1.0)
    {
      this.estrelasCheias = [1]
      this.estrelasMedias = []
      this.estrelasVazias = [1,2,3,4]
    }
    else if(this.qtStarComent == 0.5)
    {
      this.estrelasCheias = []
      this.estrelasMedias = [1]
      this.estrelasVazias = [1,2,3,4]
    }
    else if(this.qtStarComent == 0)
    {
      this.estrelasCheias = []
      this.estrelasMedias = []
      this.estrelasVazias = [1,2,3,4,5]
    }
    else if(this.qtStarComent < 0)
    {
      this.qtStarComent += 0.5
    }
  }


  // ADICIONAR PRODUTO NO CARRINHO
  addCart(id_produto)
  {
    let id_user = localStorage.getItem("id_usuario_logado_app")
    let body = {
      user_id: id_user,
      id_produto: id_produto
    }

    if(id_user == undefined)
    {
      this.toast.create({
        message: "Voce precisa está logado para realizar esta ação.",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
      return;
    }

    this.api.apiAdicionarCarrinho(body).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        this.toast.create({
          message: "Adicionado no carrinho com sucesso",
          position: "top",
          color: "success",
          duration: 2000
        }).then((t) => { t.present() })
        this.carrinhoCor = "vermelhoIcone"
        localStorage.setItem("id_compra_atual", res["id_compra"])
      }
      else
      {
        this.toast.create({
          message: res["msg"],
          position: "top",
          color: "danger",
          duration: 2000
        }).then((t) => { t.present() })
      }
    },
    e => 
    {
      console.log(e)
      this.toast.create({
        message: "Ocorreu um erro inesperado",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
    })
  }


  // REMOVER DO CARRINHO
  removeCart()
  {
    let id_compra = localStorage.getItem("id_compra_atual")
    let body = 
    {
      id_compra: id_compra,
      id_produto: this.dadosProdutos[0].id
    }
    this.api.apiRemoverCarrinho(body).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        this.toast.create({
          message: "Removido do carrinho",
          position: "top",
          color: "success",
          duration: 2000
        }).then((t) => { t.present() })
        this.carrinhoCor = "cinzaIcone"
      }
    }, 
    e => 
    {
      this.toast.create({
        message: "Ocorreu um erro inesperado",
        position: "top",
        color: "danger",
        duration: 2000
      }).then((t) => { t.present() })
      console.log(e)
    })
  }

  // MOSTRAR/ESCONDER INPUT DE COMENTÁRIO
  toggleInput()
  {
    this.inputComentarioFadeIn = !this.inputComentarioFadeIn;
  }

  ngOnInit() {
  }

}
