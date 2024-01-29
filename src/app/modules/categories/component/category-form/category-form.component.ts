import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { DynamicDialogConfig, DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { CategoryService } from "../../../../services/category/category.service";
import { CateogryEvent } from "../../../../enums/category/CateogryEvent";
import { EditCategoryAction } from "../../../../interfaces/category/EditCategoryAction";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public addCategory = CateogryEvent.ADD_CATEGORY_EVENT
  public editCategory = CateogryEvent.EDIT_CATEGORY_EVENT

  public categoryAction!: { event: EditCategoryAction }
  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  constructor(private ref: DynamicDialogRef, private formBuilder: FormBuilder, private messageService: MessageService,
              private categoryService: CategoryService, private refConf: DynamicDialogConfig) {
  }

  ngOnInit(): void {
    this.categoryAction = this.refConf.data
    console.log('this.refConf.data', this.refConf.data)
    if (this.categoryAction.event.action === this.editCategory && this.categoryAction.event.categoryName !== null || undefined) {
      this.setCategoryName(this.categoryAction.event.categoryName as string)
    }
  }

  handleSubmitAddCateggory() {
    if (this.categoryForm.value && this.categoryForm.valid) {
      const ReqCreateCategory = {
        name: this.categoryForm.value.name as string
      }
      this.categoryService.createNewCategory(ReqCreateCategory).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Categoria criada com sucesso' });
          setTimeout(() => {
            this.ref.close()
          }, 50)
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          this.ref.close()
        }
      })
    }
  }

  handleSubmitEditCategory() {
    if (this.categoryForm.value && this.categoryForm.valid && this.categoryAction.event.id) {
      const requestEditCategory: { name: string, category_id: string } = {
        name: this.categoryForm?.value.name as string,
        category_id: this.categoryAction.event.id
      }
      this.categoryService.editCategoryName(requestEditCategory).pipe(takeUntil(this.destroy$)).subscribe({
        next: (data) => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Categoria editada com sucesso' });
          setTimeout(() => {
            this.ref.close()
          }, 50)
        },
        error: (error) => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          this.ref.close()
        }
      })
    }
  }

  handleSubmitCategoryAction(): void {
    this.categoryAction.event.action === this.addCategory ? this.handleSubmitAddCateggory() : this.handleSubmitEditCategory()
    return
  }

  setCategoryName(categoery_name: string): void {
    if (categoery_name) {
      this.categoryForm.setValue({
        name: categoery_name
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
