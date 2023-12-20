import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { ProductEvent } from "../../../../enums/products/ProductEvent";
import { EventAction } from "../../../../interfaces/products/event/EventAction";
import { DeleteProductAction } from "../../../../interfaces/products/event/deleteProductAction";

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
})
export class ProductsTableComponent {
  public productsSelection!: GetAllProductsResponse
  public addProductEvent = ProductEvent.ADD_PRODUCT_EVENT
  public editProductEvent = ProductEvent.EDIT_PRODUCT_EVENT
  @Input() products: Array<GetAllProductsResponse> = [];
  @Output() productEvent = new EventEmitter<EventAction>();
  @Output() deleteProductEvent = new EventEmitter<DeleteProductAction>();

  hadleProductEvent(action: string, id?: string) {
    if (action && action !== '') {
      const productEventData = id && id !== "" ? { action: action, id: id } : { action: action }
      this.productEvent.emit(productEventData);
    }
  }

  handleDeleteProduct(product_id: string, productName: string): void {
    if (product_id !== '' && productName !== '') {
      const productEventData = { product_id, productName }
      this.deleteProductEvent.emit(productEventData);
    }
  }
}
