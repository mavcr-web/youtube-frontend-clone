import { Routes } from '@angular/router';

export const routes: Routes = [
    {path: 'login', loadComponent: () => import('./auth/pages/login/login.component').then(c => c.LoginComponent)},
    {path: 'register', loadComponent: () => import('./auth/pages/register/register.component').then(c => c.RegisterComponent)},
    {path: 'upload', loadComponent: () => import('./video/pages/upload/upload.component').then(c => c.UploadComponent)},
    {path: 'play/:id', loadComponent: () => import('./video/pages/play/play.component').then(c => c.PlayComponent)},
];
