import { Component } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Route, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { ApiService } from '../api/api.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  constructor(
    private navCtrl: NavController,
    private actRoute: ActivatedRoute,
    private router: Router,
    private api: ApiService
  )
  {
  }

  // REDIRECIONAR PARA A PÁGINA PRICINPAL, QUE PERMITE A NÃO NAVEGAÇÃO DIRETA PARA A PÁGINA PRINCIPAL ENTRE ABAS
  ngOnInit()
  {
    this.router.navigate(["/tabs/tab1/inicio"])

    // QUANDO LOGAR ELE VAI CARREGAR A PÁGINA PARA SETA O LOGIN NAS ABAS
    if(localStorage.getItem("reload") == '1')
    {
      localStorage.setItem("reload", "0")
      location.reload()
    }
  }
  

  // BUSCAR POR CATEGORIA
  procutoCategoria(categoria)
  {
    // PEGAR PRODUTOS
    this.api.apiBuscarProdutoPorCategoria({categoria:categoria}).subscribe((res) => 
    {
      if(res["success"] == true)
      {
        let cat: NavigationExtras = 
        {
          queryParams: { 
            categoria: categoria, 
            produtos: JSON.stringify(res["produto"])
          }
        }
        this.router.navigate(["/tabs/tab1/buscar-categoria"], cat)
      }
    },
    e => 
    {
      console.log(e)
    })
  }
  
}
