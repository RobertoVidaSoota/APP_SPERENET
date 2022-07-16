import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.page.html',
  styleUrls: ['./produto.page.scss'],
})
export class ProdutoPage{

  inputComentarioFadeIn = true;
  
  @ViewChild(".input_comentario") inputComentario;

  dadosProdutos = [];
  especificacoes = [];
  comentarios = [];

  qtStarComent = 5.0;
  estrelasCheias = [1,2,3,4,5]
  estrelasMedias = []
  estrelasVazias = []

  constructor(
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
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


    // PEGAR O ID DO PRODUTO
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
  }



  // POSTAR COMENTARIO
  postComent()
  {
    
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


  toggleInput()
  {
    this.inputComentarioFadeIn = !this.inputComentarioFadeIn;
  }

  ngOnInit() {
  }

}
