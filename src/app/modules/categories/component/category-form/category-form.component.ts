import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from "rxjs";
import { DynamicDialogRef } from "primeng/dynamicdialog";
import { FormBuilder, Validators } from "@angular/forms";
import { MessageService } from "primeng/api";
import { CategoryService } from "../../../../services/category/category.service";
import { CateogryEvent } from "../../../../enums/cateogry/CateogryEvent";

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: []
})
export class CategoryFormComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  public addCategory = CateogryEvent.ADD_CATEGORY_EVENT
  public editCategory = CateogryEvent.EDIT_CATEGORY_EVENT

  public categoryAction!: { event: CateogryEvent }
  public categoryForm = this.formBuilder.group({
    name: ['', Validators.required]
  })

  constructor(private ref: DynamicDialogRef, private formBuilder: FormBuilder, private messageService: MessageService,
              private categoryService: CategoryService) {
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.destroy$.next()
    this.destroy$.complete()
  }

}
