import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Product, ProductsResponse } from '../interfaces/product.interface';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

interface ProductsOtions {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private http = inject(HttpClient);

  getProducts(options: ProductsOtions): Observable<ProductsResponse> {
    const { limit = 9, offset = 0, gender = '' } = options;

    return this.http.get<ProductsResponse>(`${baseUrl}/products?`, {
      params: {
        limit,
        offset,
        gender
      }
    })
  }

  getProductBySlug(idSlug: Product['slug'] | Product['id']): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}/products/${idSlug}`);
  }
}
