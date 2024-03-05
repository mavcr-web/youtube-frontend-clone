import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  // const token = sessionStorage.getItem('token') || '';

  // const reqClone = req.clone({
  //   setHeaders: { authorization: `Bearer ${token}` },
  // });

  return next(req).pipe(
    catchError((err) => {
      if (err.status == 401) {
        // const _router: Router = inject(Router);
        // sessionStorage.removeItem('token');
        // _router.navigate(['/auth/login']);
      }
      return throwError(() => {
        return new Error('Sin Autorizacion'); //_ TEST
      }); // return throwError(err); esta linea tiene que estar obligadamente
    })
  );
};
