import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  checkLogin = "";

  constructor(
    private router: Router
  )
  {}

  ionViewDidEnter()
  {
    this.checkLogin = localStorage.getItem("login_usuario") ? 
    localStorage.getItem("login_usuario") : "";
  }

  ionViewDidLeave()
  {
    this.checkLogin = "";
  }

  ngOnInit()
  {
    this.router.navigate(["/tabs/tab3/compras"])
  }

}
