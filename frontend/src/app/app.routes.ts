import { Routes } from '@angular/router';
import { jwtGuard } from "./core/guards/jwt.guard";
import { roleGuard } from "./core/guards/role.guard";

export const routes: Routes = [
    // AUTH
    {path: 'login', loadComponent: () => import('./auth/pages/login/login.component').then(c => c.LoginComponent)},
    {path: 'register', loadComponent: () => import('./auth/pages/register/register.component').then(c => c.RegisterComponent)},
    {path: 'register-admin',canActivate: [roleGuard, jwtGuard], loadComponent: () => import('./auth/pages/register-admin/register-admin.component').then(c => c.RegisterAdminComponent)},
    // VIDEO
    {path: 'upload', loadComponent: () => import('./video/pages/upload/upload.component').then(c => c.UploadComponent)},
    {path: 'play/:id', loadComponent: () => import('./video/pages/play/play.component').then(c => c.PlayComponent)},
    {path: 'thumbnail/:id', loadComponent: () => import('./video/pages/thumbnail/thumbnail.component').then(c => c.ThumbnailComponent)},
    {path: 'videos', loadComponent: () => import('./video/pages/videos/videos.component').then(c => c.VideosComponent)},
    {path: 'history', loadComponent: () => import('./video/pages/history/history.component').then(c => c.HistoryComponent)},
    {path: '', loadComponent: () => import('./video/pages/list/list.component').then(c => c.ListComponent)},
];
