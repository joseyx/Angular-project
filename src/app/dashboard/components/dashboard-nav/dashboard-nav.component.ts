import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class DashboardNavComponent {
  name: string = '';
  constructor(private authService: AuthService, private router: Router) {
    if (!this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit() {
    this.authService.getUser().then((data) => {
      this.name = data.name;
    });
  }

  profileDropdown() {
    try {
      const profileDropdown: HTMLElement = document.getElementById(
        'profileDropdown'
      ) as HTMLElement;
      profileDropdown.classList.toggle('show');
    } catch (error) {}
  }

  async logout() {
    try {
      const response = await this.authService.logout();
      console.log(response);
      window.location.href = '/';
    } catch (error) {
      console.error(error);
    }
  }
}
