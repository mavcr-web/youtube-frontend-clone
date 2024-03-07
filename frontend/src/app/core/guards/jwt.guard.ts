import { afterNextRender } from '@angular/core';
import { CanActivateFn } from '@angular/router';

export const jwtGuard: CanActivateFn = (route, state) => {
  let token = '';

  afterNextRender(() => {
    token = sessionStorage.getItem('token') || '';
  });

  if (!token || token === '') {
    return false;
  }

  return true;
};
