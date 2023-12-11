import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-nav',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-nav.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class DashboardNavComponent {
  constructor() {}

  profileDropdown() {
    try {
      const profileDropdown: HTMLElement = document.getElementById(
        'profileDropdown'
      ) as HTMLElement;
      profileDropdown.classList.toggle('show');
    } catch (error) {}
  }
}
