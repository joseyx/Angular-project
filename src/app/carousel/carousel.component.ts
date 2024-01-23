import { Component } from '@angular/core';
import { TestComponent } from '../nav/test.component';
import { RouterModule, Router } from '@angular/router';
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
  selector: 'app-carousel',
  standalone: true,
  imports: [TestComponent, RouterModule, CommonModule],
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css',
})
export class CarouselComponent {
  peliculas: Pelicula[] = [];
  pelicula: Pelicula;

  constructor(
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
    const response = await this.dashboardService.getPeliculas();
    this.peliculas = response.peliculas;
  }

  goToPelicula(id: string) {
    this.router.navigate([`/pelicula/${id}`]);
  }
}
