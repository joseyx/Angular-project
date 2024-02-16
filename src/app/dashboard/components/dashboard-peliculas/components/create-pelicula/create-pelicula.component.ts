import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../../../../services/dashboard.service';
import { FirebaseService } from '../../../../../services/firebase/firebase.service';

interface Pelicula {
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
  selector: 'app-create-pelicula',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './create-pelicula.component.html',
  styleUrl: './create-pelicula.component.css',
})
export class CreatePeliculaComponent {
  pelicula: Pelicula;
  Poster: File | null = null;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.pelicula = {
      nombre: '',
      sinopsis: '',
      fecha_estreno: new Date(),
      genero: '',
      poster: '',
      color_texto: '#000500',
      color_fondo: '#FFF5FFF',
      color_botones: '#000500',
      color_extra1: '#000050',
      color_extra2: '#000050',
      clasificacion: '',
      duracion: 0,
    };
  }

  async onFileSelected(event: any) {
    const foto: File = event.target.files[0];

    this.Poster = foto;
  }

  async submitPelicula() {
    try {
      console.log('color_texto: ' + this.pelicula.color_texto);
      console.log('color_fondo: ' + this.pelicula.color_fondo);
      console.log('color_botones: ' + this.pelicula.color_botones);
      console.log('color_extra1: ' + this.pelicula.color_extra1);
      console.log('color_extra2: ' + this.pelicula.color_extra2);
      const posterResponse = await this.firebaseService.uploadPosterPelicula(
        this.Poster as File,
        this.pelicula.nombre
      );
      console.log;

      if (posterResponse) [(this.pelicula.poster = posterResponse)];

      const data = {
        nombre: this.pelicula.nombre,
        sinopsis: this.pelicula.sinopsis,
        fecha_estreno: this.pelicula.fecha_estreno,
        genero: this.pelicula.genero,
        poster: this.pelicula.poster,
        color_texto: this.pelicula.color_texto,
        color_fondo: this.pelicula.color_fondo,
        color_botones: this.pelicula.color_botones,
        color_extra1: this.pelicula.color_extra1,
        color_extra2: this.pelicula.color_extra2,
        clasificacion: this.pelicula.clasificacion,
        duracion: this.pelicula.duracion,
      };

      const response = await this.dashboardService.createPelicula(data);

      if (response.message == 'Pelicula creada') {
        this.router.navigate(['/dashboard/peliculas']);
      }
    } catch (error) {}
  }
}
