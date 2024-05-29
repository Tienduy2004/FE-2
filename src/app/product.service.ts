import { Injectable } from '@angular/core';
import {Product} from "./product";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {catchError, from, Observable, throwError} from "rxjs";
import { FileSaverService } from 'ngx-filesaver';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private  baseURL = "http://localhost:8080/api/v1"
  constructor(private  httpClient: HttpClient, private  fileSaverService: FileSaverService) {
  }

  getAllProduct(): Observable<Product[]>{

    return this.httpClient.get<Product[]>(`${this.baseURL}/products`);
  }

  getProductsFromCart(): Observable<Product[]> {
    // Tạo headers với withCredentials: true để chuyển cookies từ frontend đến backend
    const headers = new HttpHeaders({'Content-Type': 'application/json'});

    return this.httpClient.get<Product[]>(`${this.baseURL}/cart`, {headers, withCredentials: true});
  }
  deleteProduct(productId: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseURL}/products/${productId}`);
  }
  addProduct(product: any): Observable<any> {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.imageUrl);
    formData.append('rating', product.rating);
    formData.append('quantity', product.quantity);

    return this.httpClient.post<any>(`${this.baseURL}/admin/add`, formData);
  }
  UpdateProduct(product: any): Observable<any> {
    const formData = new FormData();
    formData.append('id', product.id);
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', product.imageUrl);
    formData.append('rating', product.rating);
    formData.append('quantity', product.quantity);
    return this.httpClient.post<any>(`${this.baseURL}/admin/update`, formData);
  }
  getProductById(productId: number): Observable<any> {
    const url = `${this.baseURL}/products/${productId}`; // Adjust the URL based on your API
    return this.httpClient.get(url);
  }
}
