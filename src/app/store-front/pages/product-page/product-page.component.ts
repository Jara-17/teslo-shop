import { Component, computed, inject, ChangeDetectionStrategy } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { ProductsService } from '@/products/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { ProductCarouselComponent } from "@/products/components/product-carousel/product-carousel.component";
import { Product } from '@/products/interfaces/product.interface';

@Component({
  selector: 'product-page',
  imports: [ProductCarouselComponent],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './product-page.component.html',
})
export default class ProductPageComponent {
  private productsService = inject(ProductsService);
  private activatedRoute = inject(ActivatedRoute);

  idSlug = computed(() => {
    return this.activatedRoute.snapshot.paramMap.get('idSlug');
  });

  productResource = httpResource<Product>(() => {
    const slug = this.idSlug();
    return slug ? this.productsService.getProductBySlugRequest(slug) : undefined;
  });
}
