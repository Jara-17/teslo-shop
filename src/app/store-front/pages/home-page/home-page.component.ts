import { Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductCardComponent } from '@/products/components/card/product-card.component';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'home-page',
  imports: [ProductCardComponent],
  templateUrl: './home-page.component.html',
})
export default class HomePageComponent {
  private productsService = inject(ProductsService);

  productsResorce = rxResource({
    request: () => ({

    }),

    loader: ({ request }) => {
      return this.productsService.getProducts();
    }
  })
}
