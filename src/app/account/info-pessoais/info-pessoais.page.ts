import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-pessoais',
  templateUrl: './info-pessoais.page.html',
  styleUrls: ['./info-pessoais.page.scss'],
})
export class InfoPessoaisPage implements OnInit {

  // @Input() myfocus:string
  constructor() { }

  ngOnInit() {
  }

  ionViewDidEnter()
  {
    let input = document.getElementById("my_auto_focus")

    input.focus()
  }

}
