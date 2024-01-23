import { Component, inject } from '@angular/core';
import { TestComponent } from '../nav/test.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
  selector: 'app-vista-pelicula',
  standalone: true,
  imports: [TestComponent, RouterModule, CommonModule],
  templateUrl: './vista-pelicula.component.html',
  styleUrl: './vista-pelicula.component.css',
})
export class VistaPeliculaComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;

  pelicula: Pelicula;
  constructor(private dashboardService: DashboardService) {
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

  ngOnInit() {
    this.dashboardService.getPelicula(this.id).then((data) => {
      this.pelicula = data.pelicula;
    });
  }
}
