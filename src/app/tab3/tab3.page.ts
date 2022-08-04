import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  constructor(
    private router: Router
  )
  {}

  ngOnInit()
  {
    this.router.navigate(["/tabs/tab3/compras"])

    if(localStorage.getItem("reload") == '1')
    {
      localStorage.setItem("reload", "0")
      location.reload()
    }
  }

}
