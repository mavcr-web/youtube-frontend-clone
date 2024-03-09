import { CanActivateFn } from '@angular/router';

export const startGuard: CanActivateFn = (route, state) => {
  let start = '';

  start = sessionStorage.getItem('start') || '';

  if (!start) {
    return true;
  }

  return false;
};
