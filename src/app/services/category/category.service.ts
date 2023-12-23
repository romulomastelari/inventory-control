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

  getAllCategories(): Observable<Array<GetCategoryResponse>> {
    return this.http.get<Array<GetCategoryResponse>>(`${this.API_URL}/categories`, this.httpOptions)
  }
}
