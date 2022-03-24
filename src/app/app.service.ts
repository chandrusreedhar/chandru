import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IEmployee, mode, Product } from './app.model';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  // url = "https://v6.exchangerate-api.com/v6/0e8581db2b085d01edc7d8ba/latest/USD";
  // url = "https://v1.nocodeapi.com/chand/cx/WrpOEHPJwrqNceBJ/rates";
  constructor(private http: HttpClient) { }

  viewMode = new BehaviorSubject<mode>({viewMode: 'login', Data: undefined});

  // getValue(){
  //   return this.http.get(this.url);
  // }

  getEmployees(){
    return [
      {id: 1, name: 'Arun', age: 26},
      {id: 2, name: 'Chandru', age: 22},
      {id: 3, name: 'Jack Sparrow', age: 32},
    ]
  }
  productDetails!: Product[];
  getProduct(){
    this.productDetails = [
      {id: 1, name: 'Mobile', price: 12000},
      {id: 2, name: 'Headset', price: 2000},
      {id: 3, name: 'Laptop', price: 28000},
    ]
    return this.productDetails;
  }

  private _url: string = "assets/data/data.json";
  getDetails(): Observable<IEmployee[]>{
    return this.http.get<IEmployee[]>(this._url)
  }
}
