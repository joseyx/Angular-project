import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';
import { Router, RouterModule } from '@angular/router';

interface Horario {
  id: string;
  hora: string;
  sala: {
    id: string;
    nombre: string;
  };
  pelicula: {
    id: string;
    nombre: string;
  };
}

@Component({
  selector: 'app-dashboard-horarios',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-horarios.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class DashboardHorariosComponent {
  horarios: Horario[] = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashboardService.getHorarios().then((data) => {
      this.horarios = data.horarios;
    });
  }
}
