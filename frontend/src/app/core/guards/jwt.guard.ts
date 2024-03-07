import { CanActivateFn } from '@angular/router';

export const jwtGuard: CanActivateFn = (route, state) => {
  let token = '';

  token = sessionStorage.getItem('token') || '';

  if (!token || token === '') {
    return false;
  }

  return true;
};
