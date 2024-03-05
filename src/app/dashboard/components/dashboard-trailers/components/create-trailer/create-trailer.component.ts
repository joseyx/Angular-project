import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { DashboardService } from '../../../../../services/dashboard.service';

interface Trailer {
  title: string;
  link: string;
}

@Component({
  selector: 'app-create-trailer',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, FormsModule],
  templateUrl: './create-trailer.component.html',
  styleUrls: [
    './create-trailer.component.css',
    '../../../../dashboard.component.css',
  ],
})
export class CreateTrailerComponent {
  trailer: Trailer;

  constructor(
    private dashboardService: DashboardService,
    private router: Router
  ) {
    this.trailer = {
      title: '',
      link: '',
    };
  }

  async submitCreate() {
    try {
      const data = {
        title: this.trailer.title,
        link: this.trailer.link,
      };

      const response = await this.dashboardService.createTrailer(data);

      if (response.message) {
        this.router.navigate(['/dashboard/trailers']);
      }
    } catch (error) {}
  }
}
