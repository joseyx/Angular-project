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
  filas: number;
  asientos_por_fila: number;
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
      filas: 0,
      asientos_por_fila: 0,
    };
  }

  async submitCreate() {
    try {
      const data = {
        nombre: this.sala.nombre,
        tipo: this.sala.tipo,
        filas: this.sala.filas,
        asientos_por_fila: this.sala.asientos_por_fila,
      };

      const response = await this.dashboardService.createSala(data);

      this.router.navigate(['/dashboard']);
    } catch (error) {}
  }
}
