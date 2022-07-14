import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-frequencia',
  templateUrl: './frequencia.page.html',
  styleUrls: ['./frequencia.page.scss'],
})
export class FrequenciaPage implements OnInit {

  times = "";
  sequence = "";

  constructor(){}

  ngOnInit(){
  }

  ionViewWillEnter()
  {
    // PEGAR INFORMAÇÕES DA FREQUENCIA DE NOTIFICAÇÕES
    this.sequence = localStorage.getItem("sequence_notif") ? 
    localStorage.getItem("sequence_notif") : "";
    
    this.times = localStorage.getItem("times_notif") ?
    localStorage.getItem("times_notif") : "";
  }


  // POR PERIODO
  changeSequence()
  {
    localStorage.setItem("sequence_notif", this.sequence)
  }


  // VEZES
  changeTimes()
  {
    localStorage.setItem("times_notif", this.times)
  }

}
