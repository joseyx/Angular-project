import { Component, inject } from '@angular/core';
import { TestComponent } from '../nav/home.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';

interface Pelicula {
  id: string;
  nombre: string;
  sinopsis: string;
  fecha_estreno: Date;
  genero: string;
  poster: string;
  color_texto: string;
  color_fondo: string;
  color_botones: string;
  color_extra1: string;
  color_extra2: string;
  duracion: number;
  clasificacion: string;
  horarios: {
    id: number;
    hora: string;
  }[];
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
  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.pelicula = {
      id: '',
      nombre: '',
      sinopsis: '',
      fecha_estreno: new Date(),
      genero: '',
      poster: '',
      color_texto: '',
      color_fondo: '',
      color_botones: '',
      color_extra1: '',
      color_extra2: '',
      duracion: 0,
      clasificacion: '',
      horarios: [
        {
          id: 0,
          hora: '',
        },
      ],
    };
  }

  ngOnInit() {
    this.dashboardService.getPelicula(this.id).then((data) => {
      this.pelicula = data.pelicula;
    });
  }

  async funcionElegida(id: number) {
    this.router.navigate([`pelicula/horario/reserva/${id}`]);
  }
}
  