import { Product } from '@/products/interfaces/product.interface';
import { ProductImagePipe } from '@/products/pipes/product-image.pipe';
import { SlicePipe } from '@angular/common';
import { Component, computed, input, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink } from "@angular/router";
import { environment } from '@env/environment';

@Component({
  selector: 'product-card',
  imports: [RouterLink, SlicePipe, ProductImagePipe],
  changeDetection: ChangeDetectionStrategy.Eager,
  templateUrl: './product-card.component.html',
})
export class ProductCardComponent {
  product = input.required<Product>();
}
