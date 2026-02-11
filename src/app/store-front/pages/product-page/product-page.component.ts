import { Component, computed, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ProductsService } from '@/products/services/products.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCarouselComponent } from "@/products/components/product-carousel/product-carousel.component";
@Component({
  selector: 'product-page',
  imports: [ProductCarouselComponent],
  templateUrl: './product-page.component.html',
})
export default class ProductPageComponent {
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);

  idSlug = computed(() => {
    return this.activatedRoute.snapshot.paramMap.get('idSlug');
  });

  productResource = rxResource({
    request: () => ({
      slug: this.idSlug()!,
    }),

    loader: ({ request }) => {
      return this.productsService.getProductBySlug(request.slug);
    }
  });

}
