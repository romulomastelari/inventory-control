import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { ProductsService } from "../../../../services/products/products.service";
import { ProductsTransferService } from "../../../../shared/services/products/products-transfer.service";
import { Router } from "@angular/router";
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { MessageService } from "primeng/api";
import { EventAction } from "../../../../interfaces/products/event/EventAction";

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<any> = new Subject<void>();
  public productsList: Array<GetAllProductsResponse> = []

  constructor(private productsService: ProductsService, private productsDTService: ProductsTransferService, private router: Router, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getProductsDatas()
  }

  private getProductsDatas() {
    const productsLoaded = this.productsDTService.getProductsDatas()

    if (productsLoaded.length > 0) {
      this.productsList = productsLoaded
      console.log('dadoss de produtos getProductsDatas', this.productsList)
    } else
      this.getAPIProductsDatas()
  }

  private getAPIProductsDatas() {
    this.productsService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: (resp) => {
        if (resp.length > 0) {
          this.productsList = resp
          console.log('dadoss de produtos getAPIProductsDatas', this.productsList)
        }
      },
      error: err => {
        console.log('err', err)
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao buscar produtos`,
          life: 2000,
        })
        this.router.navigate(['/deshboard'])
      }
    })
  }

  handleProductAction(event: EventAction) {
    if (event) {
      console.log('dados recibos', event)
    }
  }

  ngOnDestroy(): void {
    // this.destroy$.next()
    this.destroy$.complete()
  }
}
