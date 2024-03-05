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

  async createPelicula(data: any) {
    const response = await this.axiosService.post(
      `dashboard/pelicula/create`,
      data
    );

    return response.data;
  }

  async getPeliculas() {
    const response = await this.axiosService.get('dashboard/peliculas');

    return response.data;
  }

  async getPelicula(id: string) {
    const response = await this.axiosService.get(`dashboard/pelicula/${id}`);

    return response.data;
  }

  async deletePelicula(id: string) {
    const response = await this.axiosService.delete(
      `dashboard/pelicula/delete/${id}`
    );

    return response.data;
  }

  async getHorarios() {
    const response = await this.axiosService.get('dashboard/horarios');
    return response.data;
  }

  async createHorario(data: any) {
    const response = await this.axiosService.post(`dashboard/horario`, data);
    return response.data;
  }

  async getHorario(id: string) {
    const response = await this.axiosService.get(`dashboard/horario/${id}`);
    return response.data;
  }

  async changeAsientosDisponible(
    asientos: string[],
    id: string,
    userId: string
  ) {
    const data = {
      asientos: asientos,
      userId: userId,
    };
    console.log('Data', data);
    const response = await this.axiosService.post(
      `dashboard/entrada/${id}`,
      data
    );
    return response.data;
  }

  async getTrailers() {
    const response = await this.axiosService.get('dashboard/trailers');
    return response.data;
  }

  async createTrailer(data: any) {
    const response = await this.axiosService.post(`dashboard/trailer`, data);
    return response.data;
  }

  async deleteTrailer(id: string) {
    const response = await this.axiosService.delete(`dashboard/trailer/${id}`);
    return response.data;
  }
}
