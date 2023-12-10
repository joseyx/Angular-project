import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test',
  standalone: true,
  imports: [RouterModule, RouterOutlet],
  templateUrl: './test.component.html',
  styleUrl: './test.component.css',
})
export class TestComponent {
  isLoggedIn = false;
  name: string | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isUserLoggedIn();
    this.authService.getUser().then((data) => (this.name = data.name));
    console.log(this.name);
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
