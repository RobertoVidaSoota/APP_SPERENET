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
  

  constructor(
    private http: HttpClient
  ) { }


  // PAGAMENTO CARTÃO
  paymentCard(body:any)
  {    
    return this.http.post(this.url, body);
  }


  // PEGAR UM USUÁRIO
  getUser()
  {
    return this.http.get(this.url+"/get_user_auth");
  }
}
