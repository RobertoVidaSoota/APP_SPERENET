import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  url:string = "http://127.0.0.1:8000/api"
  pagseguro_uri:string = "https://sandbox.api.pagseguro.com/charges";

  constructor(
    private http: HttpClient
  ) { }


  // PAGAMENTO CARTÃO
  paymentCard(body:any)
  {
    const myHeaders = new HttpHeaders(
      {
        Authorization: "C2BEB038D0AB4D77B15CD2A560D3BCBA",
        "Content-type": "application/json"
      }
    );
    
    return this.http.post(this.pagseguro_uri, body, { headers: myHeaders} );
  }


  // PEGAR UM USUÁRIO
  getUser()
  {
    return this.http.get(this.url+"/get_user_auth");
  }
}
