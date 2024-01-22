import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';

interface Pelicula {
  id: string;
  nombre: string;
  sinopsis: string;
  fecha_estreno: Date;
  Genero: string;
  poster: string;
  color_texto: string;
  color_fondo: string;
  color_botones: string;
  color_extra1: string;
  color_extra2: string;
}

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  isLoggedIn = false;
  name: string | undefined;
  isAdmin: boolean = false;
  peliculas: Pelicula[] = [];
  pelicula: Pelicula;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService
  ) {
    this.pelicula = {
      id: '',
      nombre: '',
      sinopsis: '',
      fecha_estreno: new Date(),
      Genero: '',
      poster: '',
      color_texto: '',
      color_fondo: '',
      color_botones: '',
      color_extra1: '',
      color_extra2: '',
    };
  }

  async ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.getUser().then((data) => {
      this.name = data.name;
      if (data.rol == 'Admin') {
        this.isAdmin = true;
      }
    });
    const response = await this.dashboardService.getPeliculas();
    this.peliculas = response.peliculas;
  }

  async logout() {
    try {
      const response = await this.authService.logout();
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
