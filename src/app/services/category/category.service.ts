import { Injectable } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { Observable } from "rxjs";
import { GetCategoryResponse } from "../../interfaces/category/GetCategoryResponse";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private API_URL = environment.API_URL
  private JWT_TOKEN = this.cookieService.get('USER_INFO')
  private httpOptions = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${this.JWT_TOKEN}`
    }
  }

  constructor(private http: HttpClient, private cookieService: CookieService) {
  }

  createNewCategory(requestDatas?: {name: string}): Observable<Array<GetCategoryResponse>> {
    return this.http.post<Array<GetCategoryResponse>>(`${this.API_URL}/category`, requestDatas, this.httpOptions)
  }

  getAllCategories(): Observable<Array<GetCategoryResponse>> {
    return this.http.get<Array<GetCategoryResponse>>(`${this.API_URL}/categories`, this.httpOptions)
  }

  deleteCategory(category_id: string): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/category/delete`, {
      ...this.httpOptions,
      params: {
        category_id: category_id
      }
    })
  }

  editCategoryName(requestDatas: {category_id: string, name: string}): Observable<void> {
    return this.http.put<void>(`${this.API_URL}/category/edit`, { name: requestDatas?.name}, {
      ...this.httpOptions,
      params: {
        category_id: requestDatas?.category_id
      }
    })
  }
}
