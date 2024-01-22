import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

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
  selector: 'app-dashboard-peliculas',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-peliculas.component.html',
  styleUrls: [
    '../../dashboard.component.css',
    './dashboard-peliculas.component.css',
  ],
})
export class DashboardPeliculasComponent {
  peliculas: Pelicula[] = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  async ngOnInit() {
    const response = await this.dashboardService.getPeliculas();
    this.peliculas = response.peliculas;

    console.log(response.peliculas);
  }

  goToPelicula(id: string) {
    window.location.href = `/dashboard/pelicula/${id}`;
  }

  async deletePelicula(id: string) {
    const response = await this.dashboardService.deletePelicula(id);
    window.location.reload();
  }
}
