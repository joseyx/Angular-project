import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  isLoggedIn = false;
  name: string | undefined;
  isAdmin: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dashboardService: DashboardService
  ) {}

  async ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.getUser().then((data) => {
      this.name = data.name;
      if (data.rol == 'Admin') {
        this.isAdmin = true;
      }
    });
  }

  async logout() {
    try {
      const response = await this.authService.logout();
      console.log(response);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }
}
