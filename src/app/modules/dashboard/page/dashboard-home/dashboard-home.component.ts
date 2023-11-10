import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from "../../../../services/products/products.service";
import { MessageService } from "primeng/api";
import { GetAllProductsResponse } from "../../../../interfaces/products/response/getAllProductsResponse";
import { ProductsTransferService } from "../../../../shared/services/products/products-transfer.service";
import { Subject, takeUntil } from "rxjs";
import { ChartData, ChartOptions } from "chart.js";

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
})
export class DashboardHomeComponent implements OnInit, OnDestroy {
  public productsList: Array<GetAllProductsResponse> = []
  public productsChartDatas!: ChartData
  public productsChartOptions!: ChartOptions

  private destroy$ = new Subject<void>()


  constructor(private productsService: ProductsService, private messageService: MessageService, private productsDTService: ProductsTransferService) {
  }

  ngOnInit() {
    this.getAllProducts()
  }

  getAllProducts() {
    this.productsService.getAllProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
      next: resp => {
        if (resp.length > 0) {
          this.productsList = resp
          this.productsDTService.setProductsDatas(this.productsList)
          this.setProductsChartConfig()

          this.messageService.add({
            severity: 'success',
            summary: 'Sucesso ao trazer produtos',
            detail: ``,
            life: 2000,
          })
          console.log('dados', this.productsList)
        }
      },
      error: err => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erro',
          detail: `Erro ao buscar os produtos`,
          life: 2000,
        })
        console.log('error', err)
      }
    })
  }

  setProductsChartConfig(): void {
    if (this.productsList.length > 0) {
      const documentStyle = getComputedStyle(document.documentElement)
      const textColor = documentStyle.getPropertyValue('--text-color')
      const textSecondaryColor = documentStyle.getPropertyValue('--text-secondary-color')
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border')

      this.productsChartDatas = {
        labels: this.productsList.map(elements => elements.name),
        datasets: [
          {
            label: 'Quantidade',
            backgroundColor: documentStyle.getPropertyValue('--indigo-400'),
            borderColor: documentStyle.getPropertyValue('--indigo-400'),
            hoverBackgroundColor: documentStyle.getPropertyValue('--indigo-700'),
            data: this.productsList.map(elements => elements?.amount)
          },
        ],
      }

      this.productsChartOptions = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
          legend: {
            labels: {
              color: textColor,
            },
          },
        },
        scales: {
          x: {
            ticks: {
              color: textSecondaryColor,
              font: {
                weight: '500',
              }
            },
            grid: {
              color: surfaceBorder,
            },
          },
          y: {
            ticks: {
              color: textSecondaryColor
            },
            grid: {
              color: surfaceBorder,
            },
          },
        }
      }
    }
  }

  ngOnDestroy() {
    this.destroy$.next()
    this.destroy$.complete()
  }
}
