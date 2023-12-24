import { Component, OnDestroy, OnInit } from '@angular/core';
import { CategoryService } from "../../../../services/category/category.service";
import { DialogService, DynamicDialogRef } from "primeng/dynamicdialog";
import { ConfirmationService, MessageService } from "primeng/api";
import { Router } from "@angular/router";
import { Subject, takeUntil } from "rxjs";
import { GetCategoryResponse } from "../../../../interfaces/category/GetCategoryResponse";
import { EventAction } from "../../../../interfaces/products/event/EventAction";
import { CategoryFormComponent } from "../../component/category-form/category-form.component";

@Component({
    selector: 'app-categories-home',
    templateUrl: './categories-home.component.html',
    styleUrls: []
})
export class CategoriesHomeComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    public categoriesDatas: Array<GetCategoryResponse> = [];
    public ref!: DynamicDialogRef

    constructor(private categoryService: CategoryService, private dialogSerice: DialogService, private messageService: MessageService,
                private confirmationService: ConfirmationService, private router: Router) {
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
            this.ref = this.dialogSerice.open(CategoryFormComponent, {
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

    ngOnDestroy() {
        this.destroy$.next()
        this.destroy$.complete()
    }
}
