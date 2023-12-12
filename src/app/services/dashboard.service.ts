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

  async createSala(data: any) {
    const response = await this.axiosService.post(
      'dashboard/sala/create',
      data
    );
    return response.data;
  }

  async getSalas() {
    const response = await this.axiosService.get('dashboard/salas');
    return response.data;
  }

  async getSala(id: string) {
    const response = await this.axiosService.get(`dashboard/sala/${id}`);
    return response.data;
  }

  async updateSala(id: string, data: any) {
    const response = await this.axiosService.post(
      `dashboard/sala/update/${id}`,
      data
    );
    return response.data;
  }
}
