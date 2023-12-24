import { Component, Input } from '@angular/core';
import { GetCategoryResponse } from "../../../../interfaces/category/GetCategoryResponse";

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: []
})
export class CategoriesTableComponent {
  @Input() public categories: Array<GetCategoryResponse> = []
  public categorySelectec!: GetCategoryResponse;
}
