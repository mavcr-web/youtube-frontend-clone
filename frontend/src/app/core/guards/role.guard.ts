import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  let role = '';

  role = sessionStorage.getItem('role') || '';

  if (!role || role !== 'admin') {
    return false;
  }

  return true;
};
