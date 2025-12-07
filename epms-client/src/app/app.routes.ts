import { Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth-guard';
import { RoleGuard } from './core/guards/role-guard';

export const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth-module').then(m => m.AuthModule)
    },
    {
        path: 'admin',
        loadChildren: () => import('./features/admin-dashboard/admin-dashboard-module').then(m => m.AdminDashboardModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'review',
        loadChildren: () => import('./features/review/review-module').then(m => m.ReviewModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['HR'] }
    },
    {
        path: 'bonus',
        loadChildren: () => import('./features/bonus/bonus-module').then(m => m.BonusModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Admin'] }
    },
    {
        path: 'employee',
        loadChildren: () => import('./features/employee/employee-module').then(m => m.EmployeeModule),
        canActivate: [AuthGuard]
    },
    {
        path: 'training',
        loadChildren: () => import('./features/training/training-module').then(m => m.TrainingModule),
        canActivate: [AuthGuard, RoleGuard],
        data: { roles: ['Admin', 'HR'] }
    },
    { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'auth/login' }
];
