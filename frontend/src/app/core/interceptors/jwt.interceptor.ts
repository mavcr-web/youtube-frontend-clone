import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = sessionStorage.getItem('token') || '';

  const cloneReq = req.clone({
    setHeaders: {
      authorization: `Bearer ${token}`,
    },
  });

  return next(cloneReq).pipe(catchError(handleErrorResponse));
};

function handleErrorResponse(error: HttpErrorResponse) {
  if (error.status === 401) {
    const _router: Router = inject(Router);
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    _router.navigate(['/']);

    return throwError(() => {
      return new Error('Sin Autorizacion');
    });
  } else {
    return throwError(() => {
      return new Error('Error');
    });
  }
}
