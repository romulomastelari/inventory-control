import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from "../../../../services/products/products.service";
import { MessageService } from "primeng/api";
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { ProductsTransferService } from "../../../../shared/services/products/products-transfer.service";
import { Subject, takeUntil } from "rxjs";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public productsList: Array<GetAllProductsResponse> = []
  private destroy$ = new Subject<void>()

  constructor(private productsService: ProductsService, private messageService: MessageService, private productsDTService: ProductsTransferService) {
  }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: resp => {
        if (resp.length > 0) {
          this.productsList = resp
          this.productsDTService.setProductsDatas(this.productsList)

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ao trazer produtos',
            detail: ``,
            life: 2000,
          })
          console.log('dados', this.productsList)
        }
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao buscar os produtos`,
          life: 2000,
        })
        console.log('error', err)
      }
    })
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
