import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from "../../../../services/category/category.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GetCategoryResponse } from "../../../../interfaces/category/GetCategoryResponse";
import { EventAction } from "../../../../interfaces/products/event/EventAction";
import { CategoryFormComponent } from "../../component/category-form/category-form.component";
import { DeleteCategoryAction } from "../../../../interfaces/category/DeleteCategoryAction";

@Component({
    selector: 'app-categories-home',
    templateUrl: './categories-home.component.html',
    styleUrls: []
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public categoriesDatas: Array<GetCategoryResponse> = [];
    public ref!: DynamicDialogRef

  constructor(private categoryService: CategoryService, private dialogService: DialogService, private messageService: MessageService,
              private confirmService: ConfirmationService, private router: Router) {
    }

    ngOnInit() {
        this.getAllCategories();
    }

    getAllCategories() {
        this.categoryService.getAllCategories().pipe(takeUntil(this.destroy$)).subscribe({
            next: (response) => {
                if (response.length > 0) {
                    this.categoriesDatas = response;
                }
            },
            error: (error) => {
                this.messageService.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Erro ao buscar categorias',
                    life: 2500
                })
            this.router.navigate(['/dashboard'])
            }
        });
    }

    handleCategoryAction(event: EventAction) {
        if (event) {
          this.ref = this.dialogService.open(CategoryFormComponent, {
                header: 'Nova categoria',
                width: '70%',
                contentStyle: { overflow: 'auto' },
                baseZIndex: 10000,
                maximizable: true,
                data: {
                    event: event
                }
            });
            this.ref.onClose.pipe(takeUntil(this.destroy$)).subscribe({
                next: () => this.getAllCategories()
            })
        }
    }

  handleDeleteCategoryAction(event: DeleteCategoryAction): void {
    if (event) {
      console.log(event)
      this.confirmService.confirm({
        message: `Deseja realmente excluir a categoria ${event.category_name}?`,
        header: 'Confirmação de exclusão',
        icon: 'pi pi-exclamation-triangle',
        acceptLabel: 'Sim',
        rejectLabel: 'Não',
        accept: () => this.deleteCategory(event.category_id),
        reject: () => {
          this.messageService.add({
            severity: 'info',
            summary: 'Informação',
            detail: `Categoria ${event.category_name} não foi excluída`,
            life: 2000,
          })
        }
      })
    }
  }

  deleteCategory(category_id: string): void {
    if (category_id) {
      this.categoryService
        .deleteCategory(category_id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (response) => {
            this.getAllCategories();
            this.messageService.add({
              severity: 'success',
              summary: 'Sucesso',
              detail: 'Categoria removida com sucesso!',
              life: 3000,
            });
            this.getAllCategories();
          },
          error: (err) => {
            console.log(err);
            this.getAllCategories();
            this.messageService.add({
              severity: 'error',
              summary: 'Erro',
              detail: 'Erro ao remover categoria!',
              life: 3000,
            });
          },
        });
    }
  }

  ngOnDestroy() {
        this.destroy$.next()
        this.destroy$.complete()
    }
}
