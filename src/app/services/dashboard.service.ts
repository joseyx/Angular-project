import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private axiosService: AxiosService) {}

  async getUsers() {
    const response = await this.axiosService.get('dashboard/users');
    return response.data;
  }
}
