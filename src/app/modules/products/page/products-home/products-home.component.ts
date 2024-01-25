import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { ProductsService } from "../../../../services/products/products.service";
import { ProductsTransferService } from "../../../../shared/services/products/products-transfer.service";
import { Router } from "@angular/router";
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { ConfirmationService, MessageService } from "primeng/api";
import { EventAction } from "../../../../interfaces/products/event/EventAction";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ProductFormComponent } from "../../components/product-form/product-form.component";

@Component({
  selector: 'app-products-home',
  templateUrl: './products-home.component.html',
})
export class ProductsHomeComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<any> = new Subject<void>();
  private ref!: DynamicDialogRef
  public productsList: Array<GetAllProductsResponse> = []

  constructor(private productsService: ProductsService, private productsDTService: ProductsTransferService,
              private router: Router, private messageService: MessageService, private confirmService: ConfirmationService, private dialogService: DialogService) {
  }

  ngOnInit(): void {
    console.log('confirmService', this.confirmService)
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
      this.ref = this.dialogService.open(ProductFormComponent, {
        header: event.action === 'edit' ? 'Editar produto' : 'Novo produto',
        width: '70%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: true,
        data: {
          event: event,
          productsList: this.productsList
        },

      })
      this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
        next: () => this.getAPIProductsDatas()
      })
    }
  }

  handleDeleteProduct(event: { product_id: string, productName: string }): void {
    if (event) {
      console.log('dados recibos', event)
      this.confirmService.confirm({
        message: `Deseja realmente excluir o produto ${event.productName}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteProduct(event?.product_id),
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Informação',
            detail: `Produto ${event.productName} não foi excluído`,
            life: 2000,
          })
        }
      })
    }
  }

  deleteProduct(product_id: string): void {
    if (product_id) {
      this.productsService.deleteProduct(product_id).pipe(takeUntil(this.destroy$)).subscribe({
        next: (resp) => {
          if (resp) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: `Produto ${resp.name} excluído com sucesso`,
              life: 2000,
            })
            this.getAPIProductsDatas()
          }
        },
        error: err => {
          console.log('err', err)
          this.messageService.add({
            severity: 'error',
            summary: 'Erro',
            detail: `Erro ao excluir produto`,
            life: 2000,
          })
        }
      })
    }
  }

  ngOnDestroy(): void {
    // this.destroy$.next()
    this.destroy$.complete()
  }
}
