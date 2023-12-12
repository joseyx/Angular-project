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

interface extra_data {
  lastName: string;
  cedula: string;
  telefono: string;
  direccion: string;
  ciudad: string;
  estado: string;
}
interface Profile {
  id: number;
  name: string;
  email: string;
  rol: string;
  extra_data: extra_data;
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

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.user = {
      id: 0,
      name: '',
      email: '',
      rol: '',
      extra_data: {
        lastName: '',
        cedula: '',
        telefono: '',
        direccion: '',
        ciudad: '',
        estado: '',
      },
    };
  }

  ngOnInit() {
    this.dashboardService.getUser(this.id).then((data) => {
      this.user = data.user;
    });
  }

  async submitUpdate() {
    try {
      const data = {
        name: this.user.name,
        email: this.user.email,
        rol: this.user.rol,
        lastName: this.user.extra_data.lastName,
        cedula: this.user.extra_data.cedula,
        telefono: this.user.extra_data.telefono,
        direccion: this.user.extra_data.direccion,
        ciudad: this.user.extra_data.ciudad,
        estado: this.user.extra_data.estado,
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
