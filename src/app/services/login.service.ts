import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { Observable, tap } from 'rxjs';
import { ClientResponse } from '../interface/client.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
private URL: string = enviroment.URL;

  constructor(private http:HttpClient) {}

  login(identification: string):Observable<ClientResponse>{
    const params= new HttpParams().set("IdentificationNumber", identification)
    return this.http.get<ClientResponse>(`${this.URL}/v1/Client`,{params}).pipe(
      tap(response => console.log(response))
    )
  }
}
