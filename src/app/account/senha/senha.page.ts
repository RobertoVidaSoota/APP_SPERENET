import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-senha',
  templateUrl: './senha.page.html',
  styleUrls: ['./senha.page.scss'],
})
export class SenhaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    let input = document.getElementById("myFocus")

    input.focus()
  }

}
