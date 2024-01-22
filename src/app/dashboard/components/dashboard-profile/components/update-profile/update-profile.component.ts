import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormsModule,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { CommonModule } from '@angular/common';
import { DashboardService } from '../../../../../services/dashboard.service';
import { FirebaseService } from '../../../../../services/firebase/firebase.service';

interface Profile {
  id: number;
  name: string;
  email: string;
  rol: string;
  lastName: string;
  cedula: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  estado: string;
  foto: string | File;
}

@Component({
  selector: 'app-update-profile',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './update-profile.component.html',
  styleUrl: '../../../../dashboard.component.css',
})
export class UpdateProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;
  user: Profile;
  Foto: File | null = null;

  constructor(
    private dashboardService: DashboardService,
    private router: Router,
    private firebaseService: FirebaseService
  ) {
    this.user = {
      id: 0,
      name: '',
      email: '',
      rol: '',
      lastName: '',
      cedula: '',
      telefono: '',
      direccion: '',
      ciudad: '',
      estado: '',
      foto: '',
    };
  }

  ngOnInit() {
    this.dashboardService.getUser(this.id).then((data) => {
      this.user = data.user;
    });
  }

  async onFileSelected(event: any) {
    const foto: File = event.target.files[0];

    this.Foto = foto;
  }

  async submitUpdate() {
    try {
      console.log(this.user.foto);

      if (this.Foto != null) {
        const response = await this.firebaseService.uploadProfileFile(
          this.Foto as File,
          this.user.name
        );
        this.user.foto = response;
      }

      console.log(this.user.foto);

      const data = {
        name: this.user.name,
        email: this.user.email,
        rol: this.user.rol,
        lastName: this.user.lastName,
        cedula: this.user.cedula,
        telefono: this.user.telefono,
        direccion: this.user.direccion,
        ciudad: this.user.ciudad,
        estado: this.user.estado,
        foto: this.user.foto,
      };

      const response = await this.dashboardService.updateUser(
        this.user.id.toString(),
        data
      );
      if (response) {
        this.router.navigate(['/dashboard/profile/', this.id]);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
