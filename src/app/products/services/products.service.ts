import { Injectable } from '@angular/core';
import { HttpContext, HttpResourceRequest } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { environment } from '@env/environment';
import { CACHEABLE } from '@core/interceptors/cache.interceptor';

const baseUrl = environment.apiUrl;

export interface ProductsOptions {
  limit?: number;
  offset?: number;
  gender?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  getProductsRequest(options: ProductsOptions): HttpResourceRequest {
    const { limit = 9, offset = 0, gender = '' } = options;

    return {
      url: `${baseUrl}/products`,
      params: {
        limit,
        offset,
        gender
      },
      context: new HttpContext().set(CACHEABLE, true)
    };
  }

  getProductBySlugRequest(idSlug: Product['slug'] | Product['id']): HttpResourceRequest {
    return {
      url: `${baseUrl}/products/${idSlug}`,
      context: new HttpContext().set(CACHEABLE, true)
    };
  }
}
