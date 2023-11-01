import { Component } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
})
export class ToolbarNavigationComponent {

  constructor(private cookieService: CookieService, private router: Router) {
  }

  handleLogout():void {
    this.cookieService.delete('USER_INFO')
    void this.router.navigate(['/home'])
  }

}
