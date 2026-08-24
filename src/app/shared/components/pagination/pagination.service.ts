import { Injectable, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';

@Injectable()
export class PaginationService {
  private route = inject(ActivatedRoute);

  currentPage = toSignal(
    this.route.queryParamMap.pipe(
      map((paramMap) => paramMap.get('page') ? +paramMap.get('page')! : 1),
      map((page) => (page < 1 ? 1 : page))
    ),
    { initialValue: 1 }
  );
}
