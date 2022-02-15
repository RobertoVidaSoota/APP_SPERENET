import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

import * as L from 'leaflet'

import 'leaflet-routing-machine';
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";


@Component({
  selector: 'app-rastrear',
  templateUrl: './rastrear.page.html',
  styleUrls: ['./rastrear.page.scss'],
})
export class RastrearPage implements OnInit {

  map: L.map

  constructor(
    private navCtrl: NavController,
  )
  {}

  ngOnInit()
  {
    this.map = L.map("map").setView([-12.879736, -38.312165], 14)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    let myIcon1 = L.icon({
      iconUrl: "../../../assets/truck-64.png",
      iconSize: [45, 45]
    })

    let myIcon2 = L.icon({
      iconUrl: "../../../assets/pessoa-30.png",
      iconSize: [45, 45]
    })


    L.marker([-12.879736, -38.312165], {icon: myIcon1}).addTo(this.map);
    L.marker([-12.939894, -38.502955], {icon: myIcon2}).addTo(this.map);


    let control = L.Routing.control({
      waypoints: [
          L.latLng(-12.879736, -38.312165),
          L.latLng(-12.939894, -38.502955)
      ],
      lineOptions: {
        addWaypoints: false,
        styles: [{color: 'black'}]
      },
      draggableWaypoints: false,
      routeWhileDragging: false,
      show: false,
      collapsible: false,
      createMarker: function() { return null; },
    }).addTo(this.map);


    setTimeout(() => {
      this.map.invalidateSize();
    }, 0)
  }


  // FUNÇÃO PARA COLOCAR EM TODAS AS PÁGINAS SECUNDÁRIAS DAS ABAS
  ionViewDidEnter()
  {
    let tab = document.querySelector("ion-tab-button[tab=tab3]")   
    var navVar = this.navCtrl;

    tab.addEventListener("click", function()
    {    
      let myTab = localStorage.getItem("tab")
      // console.log(myTab)
      if(myTab == "tab3")
      {
        navVar.navigateRoot("/tabs/tab3/compras");
      }
    });

  }

}
