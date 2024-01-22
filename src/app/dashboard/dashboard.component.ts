import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DashboardNavComponent } from '../dashboard/components/dashboard-nav/dashboard-nav.component';
import { DashboardMainComponent } from './components/dashboard-main/dashboard-main.component';
import { DashboardSidebarComponent } from '../dashboard/components/dashboard-sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    DashboardNavComponent,
    DashboardMainComponent,
    RouterOutlet,
    DashboardSidebarComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {}
