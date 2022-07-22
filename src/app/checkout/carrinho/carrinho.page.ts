import { Component, OnInit } from '@angular/core';
import { List } from 'postcss/lib/list';

@Component({
  selector: 'app-carrinho',
  templateUrl: './carrinho.page.html',
  styleUrls: ['./carrinho.page.scss'],
})
export class CarrinhoPage implements OnInit {

  carrinho:any = [];

  constructor() { }

  ngOnInit()
  {
    
  }

}
