import { Component } from '@angular/core';
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { DialogService } from "primeng/dynamicdialog";
import { ProductFormComponent } from "../../../modules/products/components/product-form/product-form.component";
import { ProductEvent } from "../../../enums/products/ProductEvent";

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
})
export class ToolbarNavigationComponent {

  constructor(private cookieService: CookieService, private router: Router, private dialogService: DialogService) {
  }

  handleSaleProduct(): void {
    const saleProductActionDialog = ProductEvent.SALE_PRODUCT_EVENT
    this.dialogService.open(ProductFormComponent, {
      header: saleProductActionDialog,
      width: '70%',
      contentStyle: { "height": "300px", "overflow": "auto" },
      baseZIndex: 10000,
      maximizable: true,
      data: { event: { action: saleProductActionDialog } }
    })
  }

  handleLogout():void {
    this.cookieService.delete('USER_INFO')
    void this.router.navigate(['/home'])
  }

}
