import { Component } from '@angular/core';
import { DashboardService } from '../../../services/dashboard.service';

@Component({
  selector: 'app-dashboard-main',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-main.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class DashboardMainComponent {
  users: any[] = [];

  salas: any[] = [];
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getUsers().then((data) => {
      this.users = data.users;
    });
    this.dashboardService.getSalas().then((data) => {
      this.salas = data.salas;
      console.log(this.salas);
    });
  }

  goToProfile(id: string) {
    window.location.href = `/dashboard/profile/${id}`;
  }

  goToSala(id: string) {
    window.location.href = `/dashboard/sala/${id}`;
  }
}
