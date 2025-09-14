import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../services/loadingService/loading.service';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

export const loaderInterceptor: HttpInterceptorFn = (req, next) => {
  let loadService = inject(LoadingService);

  loadService.show();
  return next(req).pipe(
    finalize(() => loadService.hide())
  )

};
