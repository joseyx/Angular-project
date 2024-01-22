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
  selector: 'app-update-sala',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './update-sala.component.html',
  styleUrl: '../../../../dashboard.component.css',
})
export class UpdateSalaComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;
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

  ngOnInit() {
    this.dashboardService.getSala(this.id).then((data) => {
      this.sala = data.salaDeCine;
    });
  }

  async submitUpdate() {
    try {
      const data = {
        nombre: this.sala.nombre,
        tipo: this.sala.tipo,
        desde: this.sala.desde,
        hasta: this.sala.hasta,
        capacidad: this.sala.capacidad,
      };

      const response = await this.dashboardService.updateSala(
        this.sala.id.toString(),
        data
      );
      if (response) {
        this.router.navigate(['/dashboard/']);
      }
    } catch (error) {
      console.log(error);
    }
  }
}
