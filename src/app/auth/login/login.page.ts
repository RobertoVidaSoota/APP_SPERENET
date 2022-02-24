import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private api: ApiService
  ) { }

  ngOnInit()
  {
    this.api.getUser().subscribe((res) => {
      console.log(JSON.stringify(res))
    });
  }

}
