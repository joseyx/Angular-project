import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { DashboardService } from '../../../../../services/dashboard.service';

interface Pelicula {
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
  selector: 'app-view-pelicula',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './view-pelicula.component.html',
  styleUrls: [
    './view-pelicula.component.css',
    '../../../../dashboard.component.css',
  ],
})
export class ViewPeliculaComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;

  pelicula: Pelicula;

  constructor(private dashboardService: DashboardService) {
    this.pelicula = {
      nombre: '',
      sinopsis: '',
      fecha_estreno: new Date(),
      Genero: '',
      poster: '',
      color_texto: '#000500',
      color_fondo: '#FFF5FFF',
      color_botones: '#000500',
      color_extra1: '#000050',
      color_extra2: '#000050',
    };
  }

  ngOnInit() {
    this.dashboardService.getPelicula(this.id).then((data: any) => {
      this.pelicula = data.pelicula;
    });
  }
}
