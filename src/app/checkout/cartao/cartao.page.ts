import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cartao',
  templateUrl: './cartao.page.html',
  styleUrls: ['./cartao.page.scss'],
})
export class CartaoPage implements OnInit {

  isOpen:boolean = false;

  constructor() { }

  ngOnInit() {
  }

  myPopover()
  {
    this.isOpen = !this.isOpen;
  }

}
