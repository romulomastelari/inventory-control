import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { ProductEvent } from "../../../../enums/products/ProductEvent";
import { EventAction } from "../../../../interfaces/products/event/EventAction";

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

  hadleProductEvent(action: string, id?: string) {
    if (action && action !== '') {
      const productEventData = id && id !== "" ? { action: action, id: id } : { action: action }
      this.productEvent.emit(productEventData);
    }

  }
}
