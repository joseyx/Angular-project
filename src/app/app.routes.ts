import { Routes } from '@angular/router';
import { TestComponent } from './nav/test.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { PasswordForgotComponent } from './auth/password-forgot/password-forgot.component';
import { ResetPasswordComponent } from './auth/reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardMainComponent } from './dashboard/components/dashboard-main/dashboard-main.component';
import { DashboardProfileComponent } from './dashboard/components/dashboard-profile/dashboard-profile.component';
import { UpdateProfileComponent } from './dashboard/components/dashboard-profile/components/update-profile/update-profile.component';

import { ViewSalaComponent } from './dashboard/components/view-sala/view-sala.component';
import { CreateSalaComponent } from './dashboard/components/view-sala/components/create-sala/create-sala.component';
import { UpdateSalaComponent } from './dashboard/components/view-sala/components/update-sala/update-sala.component';

export const routes: Routes = [
  {
    path: '',
    component: TestComponent,
    title: 'Test',
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Login',
  },
  {
    path: 'register',
    component: RegisterComponent,
    title: 'Register',
  },
  {
    path: 'forgot-password',
    component: PasswordForgotComponent,
    title: 'Forgot Password',
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    title: 'Reset Password',
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    title: 'Dashboard',
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        component: DashboardMainComponent,
        pathMatch: 'full',
      },
      {
        path: 'profile/:id',
        component: DashboardProfileComponent,
      },
      {
        path: 'profile/:id/edit',
        component: UpdateProfileComponent,
      },
      {
        path: 'sala/create',
        component: CreateSalaComponent,
      },
      {
        path: 'sala/:id',
        component: ViewSalaComponent,
      },
      {
        path: 'sala/:id/edit',
        component: UpdateSalaComponent,
      },
    ],
  },
];
