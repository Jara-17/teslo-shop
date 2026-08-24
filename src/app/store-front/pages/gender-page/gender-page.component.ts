import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';
import { TitleCasePipe } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { map } from 'rxjs';

import { ProductsListComponent } from '@/products/components/products-list/products-list-component';
import { ProductsService } from '@/products/services/products.service';

@Component({
  selector: 'gender-page',
  imports: [ProductsListComponent, TitleCasePipe],
  templateUrl: './gender-page.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styles: ``
})
export default class GenderPageComponent {
  route = inject(ActivatedRoute);
  private productsService = inject(ProductsService);
  gender = toSignal<string>(
    this.route.params.pipe(
      map(({ gender }) => gender)
    )
  );


  productsResorce = rxResource({
    params: () => ({
      gender: this.gender()
    }),

    stream: ({ params }) => {
      return this.productsService.getProducts({
        gender: this.gender()
      });
    }
  })
}
