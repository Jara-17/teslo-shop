import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl = environment.apiUrl;

@Pipe({
  name: 'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(value: string | string[]): string {
    if (Array.isArray(value) && value.length > 0) {
      return `${baseUrl}/files/product/${value[0]}`;
    }

    if (typeof value === 'string') {
      return `${baseUrl}/files/product/${value}`;
    }

    return './assets/images/no-image.jpg';
  }
}
