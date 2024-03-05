import { HttpInterceptorFn } from '@angular/common/http';
import { afterNextRender, inject } from '@angular/core';
import { Router } from '@angular/router';
import { after } from 'node:test';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  let token = '';
  afterNextRender(() => {
    token = sessionStorage.getItem('token') || '';
  });

  return next(
    req.clone({
      setHeaders: { authorization: `Bearer ${token}` },
    })
  ).pipe(
    catchError((err) => {
      if (err.status == 401) {
        afterNextRender(() => {
          const _router: Router = inject(Router);
          _router.navigate(['/auth/login']);
          sessionStorage.removeItem('token');
        });
      }
      return throwError(() => {
        return new Error('Sin Autorizacion'); //_ TEST
      }); // return throwError(err); esta linea tiene que estar obligadamente
    })
  );
};
