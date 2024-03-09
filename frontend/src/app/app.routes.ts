import { Routes } from '@angular/router';
import { jwtGuard } from "./core/guards/jwt.guard";
import { roleGuard } from "./core/guards/role.guard";
import { startGuard } from './core/guards/start.guard';

export const routes: Routes = [
    // AUTH
    {path: 'login', loadComponent: () => import('./modules/auth/pages/login/login.component').then(c => c.LoginComponent)},
    {path: 'register', loadComponent: () => import('./modules/auth/pages/register/register.component').then(c => c.RegisterComponent)},
    {path: 'register-admin',canDeactivate: [startGuard], loadComponent: () => import('./modules/auth/pages/register-admin/register-admin.component').then(c => c.RegisterAdminComponent)},
    // VIDEO
    {path: 'upload', canActivate: [jwtGuard], loadComponent: () => import('./modules/video/pages/upload/upload.component').then(c => c.UploadComponent)},
    {path: 'play/:id', loadComponent: () => import('./modules/video/pages/play/play.component').then(c => c.PlayComponent)},
    {path: 'thumbnail/:id', loadComponent: () => import('./modules/video/pages/thumbnail/thumbnail.component').then(c => c.ThumbnailComponent)},
    {path: 'videos', canActivate: [jwtGuard], loadComponent: () => import('./modules/video/pages/videos/videos.component').then(c => c.VideosComponent)},
    {path: 'videos/:id', loadComponent: () => import('./modules/video/pages/videos/videos.component').then(c => c.VideosComponent)},
    {path: 'history', canActivate: [jwtGuard], loadComponent: () => import('./modules/video/pages/history/history.component').then(c => c.HistoryComponent)},
    {path: '', loadComponent: () => import('./modules/video/pages/list/list.component').then(c => c.ListComponent)},
];
