import { Routes } from '@angular/router';
import { TestComponent } from './nav/home.component';
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
import { DashboardPeliculasComponent } from './dashboard/components/dashboard-peliculas/dashboard-peliculas.component';
import { CreatePeliculaComponent } from './dashboard/components/dashboard-peliculas/components/create-pelicula/create-pelicula.component';
import { ViewPeliculaComponent } from './dashboard/components/dashboard-peliculas/components/view-pelicula/view-pelicula.component';
import { EditPeliculaComponent } from './dashboard/components/dashboard-peliculas/components/edit-pelicula/edit-pelicula.component';
import { CarouselComponent } from './carousel/carousel.component';
import { VistaPeliculaComponent } from './vista-pelicula/vista-pelicula.component';
import { ReservaAsientosComponent } from './reserva-asientos/reserva-asientos.component';
import { DashboardHorariosComponent } from './dashboard/components/dashboard-horarios/dashboard-horarios.component';
import { CrearHorarioComponent } from './dashboard/components/dashboard-horarios/components/crear-horario/crear-horario.component';
import { CantidadAsientosComponent } from './cantidad-asientos/cantidad-asientos.component';

export const routes: Routes = [
  {
    path: '',
    component: CarouselComponent,
    title: 'Main',
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
    path: 'pelicula/:id',
    component: VistaPeliculaComponent,
  },
  {
    path: 'pelicula/horario/:id',
    component: ReservaAsientosComponent,
  },
  {
    path: 'pelicula/horario/reserva/:id',
    component: CantidadAsientosComponent,
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
      {
        path: 'peliculas',
        component: DashboardPeliculasComponent,
      },
      {
        path: 'peliculas/create',
        component: CreatePeliculaComponent,
      },
      {
        path: 'pelicula/:id',
        component: ViewPeliculaComponent,
      },
      {
        path: 'pelicula/:id/edit',
        component: EditPeliculaComponent,
      },
      {
        path: 'horarios',
        component: DashboardHorariosComponent,
      },
      {
        path: 'horarios/create',
        component: CrearHorarioComponent,
      },
    ],
  },
];
