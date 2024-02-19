import { Component } from '@angular/core';
import { DashboardService } from '../../../../../services/dashboard.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Horario {
  hora: string;
  sala_id: number;
  pelicula_id: number;
}

interface Sala {
  nombre: string;
  id: number;
}

interface Pelicula {
  id: number;
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
  clasificacion: string;
  duracion: number;
}

@Component({
  selector: 'app-crear-horario',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './crear-horario.component.html',
  styleUrls: ['../../../../dashboard.component.css'],
})
export class CrearHorarioComponent {
  peliculas: Pelicula[] = [];
  salas: Sala[] = [];
  horario: Horario;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.horario = {
      hora: '12:00:00',
      sala_id: 0,
      pelicula_id: 0,
    };
  }

  ngOnInit(): void {
    this.dashboardService.getPeliculas().then((data) => {
      this.peliculas = data.peliculas;
    });
    console.log(this.peliculas);
    this.dashboardService.getSalas().then((data) => {
      this.salas = data.salas;
    });
    console.log(this.salas);
  }

  async submitHorario() {
    try {
      const data = {
        sala_id: this.horario.sala_id,
        pelicula_id: this.horario.pelicula_id,
        hora: this.horario.hora,
      };

      console.log(data);

      const response = await this.dashboardService.createHorario(data);

      if (response.message == 'Horario creado') {
        this.router.navigate(['/dashboard/horarios']);
      }
    } catch (error) {}
  }

  movieSelect(event: any) {
    this.horario.pelicula_id = event.target.value;
  }

  salaSelect(event: any) {
    this.horario.sala_id = event.target.value;
  }
}
