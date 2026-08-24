import { Product } from '@/products/interfaces/product.interface';
import { Component, input } from '@angular/core';
import { ProductCardComponent } from "../card/product-card.component";

@Component({
  selector: 'products-list',
  templateUrl: 'products-list.component.html',
  imports: [ProductCardComponent]
})

export class ProductsListComponent {
  products = input.required<Product[]>();
}
