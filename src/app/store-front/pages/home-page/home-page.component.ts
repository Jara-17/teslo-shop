import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ProductsService } from '@/products/services/products.service';
import { ProductsListComponent } from '@/products/components/products-list/products-list-component';
import { PaginationComponent } from "@/shared/components/pagination/pagination.component";
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductsResponse } from '@/products/interfaces/product.interface';

const PAGE_LIMIT = 9;

@Component({
  imports: [ ProductsListComponent, PaginationComponent],
  providers: [PaginationService],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private productsService = inject(ProductsService);
  private paginationService = inject(PaginationService);

  currentPage = this.paginationService.currentPage;

  productsResource = httpResource<ProductsResponse>(
    () => this.productsService.getProductsRequest({
      limit: PAGE_LIMIT,
      offset: (this.currentPage() - 1) * PAGE_LIMIT,
    })
  );
}
