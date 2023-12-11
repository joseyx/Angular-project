import { Injectable } from '@angular/core';
import { AxiosService } from './axios.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private axiosService: AxiosService) {}
}
