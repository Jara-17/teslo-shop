import { Injectable } from '@angular/core';
import { HttpResourceRequest } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import { environment } from '@env/environment';

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
      }
    };
  }

  getProductBySlugUrl(idSlug: Product['slug'] | Product['id']): string {
    return `${baseUrl}/products/${idSlug}`;
  }
}
