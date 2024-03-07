import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { afterNextRender } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';

  afterNextRender(() => {
    token = sessionStorage.getItem('token') || '';
  });

  // token = sessionStorage.getItem('token') || '';

  return next(
    req.clone({
      setHeaders: {
        authorization: `Bearer ${token}`,
      },
    })
  ).pipe(
    catchError((err: HttpErrorResponse) => {
      return handleErrorResponse(err);
    })
  );
};

function handleErrorResponse(error: HttpErrorResponse) {
  if (error.status === 401) {
    afterNextRender(() => {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('role');
    });
    // sessionStorage.removeItem('token');
    // sessionStorage.removeItem('role');

    return throwError(() => {
      return new Error('Sin Autorizacion');
    });
  } else {
    return throwError(() => {
      return new Error('Error');
    });
  }
}
