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

  async getUser(id: string) {
    const response = await this.axiosService.get(`dashboard/user/${id}`);
    return response.data;
  }

  async updateUser(id: string, data: any) {
    const response = await this.axiosService.post(`dashboard/user/${id}`, data);
    return response.data;
  }
}
