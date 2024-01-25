import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetCategoryResponse } from "../../../../interfaces/category/GetCategoryResponse";
import { CateogryEvent } from "../../../../enums/category/CateogryEvent";
import { EditCategoryAction } from "../../../../interfaces/category/EditCategoryAction";
import { DeleteCategoryAction } from "../../../../interfaces/category/DeleteCategoryAction";

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategoryResponse> = []
  @Output() public categoryEvent = new EventEmitter<EditCategoryAction>
  @Output() public deleteCategoryEvent = new EventEmitter<DeleteCategoryAction>
  public categorySelectec!: GetCategoryResponse;
  public addCategory = CateogryEvent.ADD_CATEGORY_EVENT
  public editCategory = CateogryEvent.EDIT_CATEGORY_EVENT

  handleDeleteCategoryEvent(category_id: string, category_name: string) {
    if(category_id !== '' && category_name !== '') {
      this.deleteCategoryEvent.emit({category_id, category_name})
    }
  }

  handleCategoryEvent(action: string, id?: string, categoryName?: string) {
    if (action && action !== '') {
      this.categoryEvent.emit({ action, id, categoryName })
    }
  }
}
