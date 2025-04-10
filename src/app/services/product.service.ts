import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  apiUrl = 'https://localhost:44364/api/Products/';

  constructor(private httpClient: HttpClient) {}

  getProducts(): Observable<ListResponseModel<Product>> {
    let newUrl = this.apiUrl + 'getall';
    return this.httpClient.get<ListResponseModel<Product>>(newUrl);
  }

  getProductsByCategoryId(id: string): Observable<ListResponseModel<Product>> {
    let newUrl = this.apiUrl + 'getbycategory?categoryId=' + id;
    return this.httpClient.get<ListResponseModel<Product>>(newUrl);
  }
}
