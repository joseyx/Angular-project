import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

interface Sala {
  id: string;
  nombre: string;
  tipo: string;
  desde: Date;
  hasta: Date;
  capacidad: number;
}

@Component({
  selector: 'app-view-sala',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './view-sala.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class ViewSalaComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;

  sala: Sala;
  constructor(private dashboardService: DashboardService) {
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
}
