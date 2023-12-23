import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { CategoryService } from "../../../../services/category/category.service";
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { GetCategoryResponse } from "../../../../interfaces/category/GetCategoryResponse";
import { CreateProductsRequest } from "../../../../interfaces/products/request/CreateProductsRequest";
import { ProductsService } from "../../../../services/products/products.service";
import { ProductEvent } from "../../../../enums/products/ProductEvent";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { EventAction } from "../../../../interfaces/products/event/EventAction";
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { ProductsTransferService } from "../../../../shared/services/products/products-transfer.service";
import { EditProductRequest } from "../../../../interfaces/products/request/EditProductRequest";

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: []
})
export class ProductFormComponent implements OnInit, OnDestroy {
  private readonly destroy$: Subject<void> = new Subject();
  @Output() onCloseDialog: EventEmitter<void> = new EventEmitter<void>();
  private refDialog!: DynamicDialogRef

  public addProductForm = this.formBuild.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    category_id: ['', Validators.required],
    amount: [0, Validators.required],
  })
  public editProductForm = this.formBuild.group({
    name: ['', Validators.required],
    price: ['', Validators.required],
    description: ['', Validators.required],
    amount: [0, Validators.required],
    category_id: ['', Validators.required],
  })

  public categoriesDatas: Array<GetCategoryResponse> = [];
  public categoriesSelected: Array<{ name: string; code: string }> = []
  public productAction!: {
    event: EventAction,
    productsList: Array<GetAllProductsResponse>
  }
  public productSelectedDatas!: GetAllProductsResponse
  public productsDatas: Array<GetAllProductsResponse> = []
  public renderDropDown = false

  public addProductAction = ProductEvent.ADD_PRODUCT_EVENT
  public editProductAction = ProductEvent.EDIT_PRODUCT_EVENT
  public saleProductEvent = ProductEvent.SALE_PRODUCT_EVENT

  constructor(
    private categoriesService: CategoryService, private formBuild: FormBuilder, private messageService: MessageService,
    private router: Router, private productsService: ProductsService, private ref: DynamicDialogConfig, private productsDtService: ProductsTransferService
  ) {
  }

  ngOnInit() {
    this.productAction = this.ref.data
    if (this.productAction.event.action === this.saleProductEvent) {
      this.getProductsDatas()
    }

    this.getAllCategories();
    this.renderDropDown = true
  }

  private getAllCategories() {
    this.categoriesService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe(response => {
      {
        if (response.length > 0) {
          this.categoriesDatas = response;
          if (this.productAction.event.action === this.editProductAction) {
            this.geProductSelectedDatas(this.productAction?.event?.id as string)
          }
        }
      }
    })
  }

  handleAddProduct(): void {
    if (this.addProductForm?.value && this.addProductForm?.valid) {
      const createProduct: CreateProductsRequest = {
        name: this.addProductForm?.value.name as string,
        price: this.addProductForm?.value.price as string,
        description: this.addProductForm?.value.description as string,
        category_id: this.addProductForm?.value.category_id as string,
        amount: Number(this.addProductForm?.value.amount),
      }
      this.productsService.createProduct(createProduct).pipe(takeUntil(this.destroy$)).subscribe(response => {
          if (response) {
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Produto criado com sucesso',
              life: 2500
            });
          }
        },
        error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao criar produto', life: 2500 })
        });
      this.addProductForm.reset()
    }
  }

  handleSubmitEditProduct(): void {
    if (this.editProductForm.value && this.editProductForm.valid && this.productAction) {
      const resquestEditProcut: EditProductRequest = {
        name: this.editProductForm.value.name as string,
        price: this.editProductForm.value.price as string,
        description: this.editProductForm.value.description as string,
        product_id: this.productAction.event.id as string,
        amount: Number(this.editProductForm.value.amount),
        category_id: this.editProductForm.value.category_id as string,
      }
      this.productsService.editProduct(resquestEditProcut).pipe(takeUntil(this.destroy$)).subscribe({
        next: () => {
          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso',
            detail: 'Produto editado com sucesso',
            life: 2500
          });
        },
        error: error => {
          this.messageService.add({ severity: 'error', summary: 'Erro', detail: 'Erro ao editar produto', life: 2500 })
        }
      })
    }
  }

  geProductSelectedDatas(product_id: string): void {
    const allProducts = this.productAction.productsList
    if (allProducts.length > 0) {
      const productSelected = allProducts.filter((product) => product.id === product_id)
      if (productSelected) {
        this.productSelectedDatas = productSelected[0]
        this.editProductForm.setValue({
          name: this.productSelectedDatas.name,
          price: this.productSelectedDatas.price,
          description: this.productSelectedDatas.description,
          amount: this.productSelectedDatas.amount,
          category_id: this.productSelectedDatas.category?.id,
        })
      }
    }
  }

  getProductsDatas(): void {
    this.productsService.getAllProducts().pipe(takeUntil(this.destroy$)).subscribe(response => {
      if (response.length > 0) {
        this.productsDatas = response
        this.productsDatas && this.productsDtService.setProductsDatas(this.productsDatas)
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
