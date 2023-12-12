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

interface Sala {
  id: string;
  nombre: string;
  tipo: string;
  desde: Date;
  hasta: Date;
  capacidad: number;
}

@Component({
  selector: 'app-create-sala',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './create-sala.component.html',
  styleUrl: '../../../../dashboard.component.css',
})
export class CreateSalaComponent {
  sala: Sala;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.sala = {
      id: '',
      nombre: '',
      tipo: '',
      desde: new Date(),
      hasta: new Date(),
      capacidad: 0,
    };
  }

  async submitCreate() {
    try {
      const data = {
        nombre: this.sala.nombre,
        tipo: this.sala.tipo,
        desde: this.sala.desde,
        hasta: this.sala.hasta,
        capacidad: this.sala.capacidad,
      };

      const response = await this.dashboardService.createSala(data);

      this.router.navigate(['/dashboard']);
    } catch (error) {}
  }
}
