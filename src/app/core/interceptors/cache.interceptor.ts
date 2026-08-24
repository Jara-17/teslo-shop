import { HttpContextToken, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { of, tap } from 'rxjs';

export const CACHEABLE = new HttpContextToken<boolean>(() => false);

const cache = new Map<string, HttpResponse<unknown>>();

export const cacheInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.method !== 'GET' || !req.context.get(CACHEABLE)) {
    return next(req);
  }

  const cacheKey = req.urlWithParams;
  const cachedResponse = cache.get(cacheKey);

  if (cachedResponse) {
    return of(cachedResponse.clone());
  }

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        cache.set(cacheKey, event.clone());
      }
    })
  );
};
