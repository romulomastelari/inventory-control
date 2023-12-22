import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { CookieService } from "ngx-cookie-service";
import { environment } from "../../../environments/environment";
import { map, Observable } from "rxjs";
import { GetAllProductsResponse } from "../../interfaces/products/response/getAllProductsResponse";
import { DeleteProductResponse } from "../../interfaces/products/response/DeleteProductResponse";
import { CreateProductsRequest } from "../../interfaces/products/request/CreateProductsRequest";
import { CreateProductResponse } from "../../interfaces/products/response/CreateProductResponse";
import { EditProductRequest } from "../../interfaces/products/request/EditProductRequest";


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private API_URL = environment.API_URL
  private JWT_TOKEN = this.cookieService.get('USER_INFO')
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    })
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  getAllProducts(): Observable<Array<GetAllProductsResponse>> {
    return this.http.get<Array<GetAllProductsResponse>>(`${this.API_URL}/products`, this.httpOptions).pipe(
      map((product) => product.filter((resp) => resp?.amount > 0))
    )
  }

  deleteProduct(product_id: string): Observable<DeleteProductResponse> {
    return this.http.delete<DeleteProductResponse>(`${this.API_URL}/product/delete`, {
      ...this.httpOptions,
      params: { product_id: product_id }
    })
  }

  createProduct(requestDatas: CreateProductsRequest): Observable<CreateProductResponse> {
    return this.http.post<CreateProductResponse>(`${this.API_URL}/product`, requestDatas, this.httpOptions)
  }

  editProduct(requestDatas: EditProductRequest): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/product/edit`, requestDatas, this.httpOptions)
  }

}
