import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { ProductsListComponent } from '@/products/components/products-list/products-list-component';
import { PaginationComponent } from '@/shared/components/pagination/pagination.component';
import { PaginationService } from '@/shared/components/pagination/pagination.service';
import { ProductsService } from '@/products/services/products.service';
import { ProductsResponse } from '@/products/interfaces/product.interface';

const PAGE_LIMIT = 9;

@Component({
  selector: 'gender-page',
  imports: [ProductsListComponent, TitleCasePipe, PaginationComponent],
  providers: [PaginationService],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export default class GenderPageComponent {
  route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  private paginationService = inject(PaginationService);

  gender = toSignal<string>(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );

  currentPage = this.paginationService.currentPage;

  productsResource = httpResource<ProductsResponse>(
    () => this.productsService.getProductsRequest({
      gender: this.gender(),
      limit: PAGE_LIMIT,
      offset: (this.currentPage() - 1) * PAGE_LIMIT,
    })
  );
}
