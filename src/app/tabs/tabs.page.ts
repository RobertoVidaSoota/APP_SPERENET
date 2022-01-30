import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  constructor(
    )
  {}

  // FUNÇÃO QUE PERMITE A NÃO NAVEGAÇÃO DIRETA PARA A PÁGINA PRINCIPAL ENTRE ABAS
  tabed(e)
  {
    setTimeout(()=>{
      localStorage.setItem("tab", e.tab);
      let myTab = localStorage.getItem("tab")
    }, 100)

    
  }



  
}
