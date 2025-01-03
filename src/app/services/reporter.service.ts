import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';  
import { GetAverageBalanceByType, GetClientsHighestBalance } from '../interface/reporter.interface';

@Injectable({
  providedIn: 'root'
})
export class ReporterService {

  private URL: string = enviroment.URL;

  constructor(private http:HttpClient) {}

  getClientsHighestBalance():Observable<GetClientsHighestBalance[]>{
      return this.http.get<GetClientsHighestBalance[]>(`${this.URL}/v1/Reporter/ClientsHighestBalance`).pipe(
         catchError(error => throwError(() => error.message))
      )
    }
    
  getAverageBalanceByType():Observable<GetAverageBalanceByType[]>{
    return this.http.get<GetAverageBalanceByType[]>(`${this.URL}/v1/Reporter/AverageBalanceByType`).pipe(
        catchError(error => throwError(() => error.message))
    )
  }
}
