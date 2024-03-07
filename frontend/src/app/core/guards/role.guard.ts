import { afterNextRender } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const roleGuard: CanActivateFn = (route, state) => {
  let role = '';

  afterNextRender(() => {
    role = sessionStorage.getItem('role') || '';
  });

  if (!role || role !== 'admin') {
    return false;
  }

  return true;
};
