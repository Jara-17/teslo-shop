import { Component, inject, ChangeDetectionStrategy } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@/products/components/card/product-card.component';
import { ProductsService } from '@/products/services/products.service';
import { ProductsListComponent } from '@/products/components/products-list/products-list-component';

@Component({
  selector: 'home-page',
  imports: [ProductCardComponent, ProductsListComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private productsService = inject(ProductsService);

  productsResorce = rxResource({
    params: () => ({
    }),

    stream: ({ params }) => {
      return this.productsService.getProducts({});
    }
  })
}
