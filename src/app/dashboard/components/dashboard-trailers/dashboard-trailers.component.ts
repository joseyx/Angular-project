import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../../services/dashboard.service';

interface trailer {
  id: string;
  title: string;
  link: string;
}

@Component({
  selector: 'app-dashboard-trailers',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-trailers.component.html',
  styleUrls: [
    './dashboard-trailers.component.css',
    '../../dashboard.component.css',
  ],
})
export class DashboardTrailersComponent {
  trailers: trailer[] = [];

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {}

  ngOnInit() {
    this.dashboardService.getTrailers().then((data) => {
      this.trailers = data.trailers;
    });
  }

  async deleteTrailer(id: string) {
    try {
      const response = await this.dashboardService.deleteTrailer(id);
      if (response.message) {
        this.trailers = this.trailers.filter((trailer) => trailer.id !== id);
      }
    } catch (error) {}
  }
}
