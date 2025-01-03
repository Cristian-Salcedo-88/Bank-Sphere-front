import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { ProductRegister, ProductResponse, UpdateProduct } from '../interface/product.interface';
import { catchError, map, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
private URL: string = enviroment.URL;

  constructor(private http:HttpClient) {}

  getProduct(clientId: number):Observable<ProductResponse[]>{
    const params= new HttpParams().set("ClientId", clientId)
    return this.http.get<ProductResponse[]>(`${this.URL}/v1/Product`,{params}).pipe(
       catchError(error => throwError(() => error.message))
    )
  }

  AddProduct(dataProduct: ProductRegister):Observable<Response>{
      return this.http.post<Response>(`${this.URL}/v1/Product`, dataProduct).pipe(
        catchError(error => throwError(() => error.message))
      )
    }

  UpdateProduct(updateProduct: UpdateProduct):Observable<Response>{
    return this.http.patch<Response>(`${this.URL}/v1/Product`, updateProduct).pipe(
      catchError(error => throwError(() => error.message))
    )
  }

  AddTransaction(dataTransaction: UpdateProduct):Observable<Response>{
    return this.http.post<Response>(`${this.URL}/v1/Transaction`, dataTransaction).pipe(
      catchError(error => throwError(() => error.message))
    )
  }
}
