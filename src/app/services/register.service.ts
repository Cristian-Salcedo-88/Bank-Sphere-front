import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { ClientRegister } from '../interface/client.interface';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService{
private URL: string = enviroment.URL;

  constructor(private http:HttpClient) {}

  register(dataRegister: ClientRegister):Observable<Response>{
    return this.http.post<Response>(`${this.URL}/v1/Client`, dataRegister).pipe(
      catchError(error => throwError(() => error.message))
    )
  }
}
