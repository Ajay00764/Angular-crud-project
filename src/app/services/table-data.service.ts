import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class TableDataService {

  tableDataUrl = 'https://fakestoreapi.com/products'

  constructor(private http: HttpClient) { }

  getUserData(){
    return this.http.get(this.tableDataUrl);
  }
}
