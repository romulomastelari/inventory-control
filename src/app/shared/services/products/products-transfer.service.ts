import { Injectable } from '@angular/core';
import { BehaviorSubject, map, take } from "rxjs";
import { GetAllProductsResponse } from "../../../interfaces/products/response/getAllProductsResponse";

@Injectable({
  providedIn: 'root'
})
export class ProductsTransferService {
  public productsDataEmitter$ = new BehaviorSubject<Array<GetAllProductsResponse> | null>(null)
  public productsDatas: Array<GetAllProductsResponse> = []

  setProductsDatas(products: Array<GetAllProductsResponse>): void {
    if (products) {
      this.productsDataEmitter$.next(products)
      this.getProductsDatas()
    }
  }

  getProductsDatas() {
    this.productsDataEmitter$.pipe(take(1),
      map((datas) => datas?.filter((products) => products.amount > 0)))
      .subscribe({
        next: value => {
          if (value) {
            this.productsDatas = value
          }
        },
      })
    return this.productsDatas
  }
}
