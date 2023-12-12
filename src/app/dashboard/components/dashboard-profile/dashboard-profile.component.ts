import { Component, inject } from '@angular/core';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

interface extra_data {
  lastName?: string;
  cedula?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  estado?: string;
  foto?: string;
}
interface Profile {
  id: number;
  name: string;
  email: string;
  rol: string;
  extra_data?: extra_data;
}
@Component({
  selector: 'app-dashboard-profile',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-profile.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class DashboardProfileComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;

  user: Profile;
  constructor(private dashboardService: DashboardService) {
    this.user = {
      id: 0,
      name: '',
      email: '',
      rol: '',
    };
  }

  ngOnInit() {
    this.dashboardService.getUser(this.id).then((data) => {
      this.user = data.user;
    });
  }
}
