import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: '../../dashboard.component.css',
})
export class DashboardSidebarComponent {}
