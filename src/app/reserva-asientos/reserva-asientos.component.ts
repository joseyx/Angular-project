import { CUSTOM_ELEMENTS_SCHEMA, Component, inject } from '@angular/core';
import { TestComponent } from '../nav/home.component';
import {
  ActivatedRoute,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../services/dashboard.service';
import { LocalService } from '../services/localstorage.service';

interface Horario {
  id: number;
  hora: string;
  asientos: {
    id: string;
    identificador: string;
    disponible: boolean;
    state?: string;
  }[];
  pelicula: {
    id: string;
    nombre: string;
    clasificacion: string;
    sinopsis: string;
  };
  sala: {
    id: string;
    nombre: string;
    filas: number;
    asientos_por_fila: number;
  };
}

@Component({
  selector: 'app-reserva-asientos',
  standalone: true,
  imports: [TestComponent, RouterModule, RouterOutlet, CommonModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './reserva-asientos.component.html',
  styleUrl: './reserva-asientos.component.css',
})
export class ReservaAsientosComponent {
  lastIdentifier: string | undefined;

  horario: Horario = {
    id: 0,
    hora: '',
    asientos: [
      {
        id: '',
        identificador: '',
        disponible: false,
      },
    ],
    pelicula: {
      id: '',
      nombre: '',
      clasificacion: '',
      sinopsis: '',
    },
    sala: {
      id: '',
      nombre: '',
      filas: 0,
      asientos_por_fila: 0,
    },
  };
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;

  private cantidad: number = 0;
  constructor(
    private dashboardService: DashboardService,
    private localService: LocalService,
    private router: Router
  ) {}

  async ngOnInit() {
    await this.dashboardService.getHorario(this.id).then((data) => {
      this.horario = data.horario;
    });
    // add states to asientos
    this.horario.asientos.forEach((asiento) => {
      asiento.state = asiento.disponible ? 'disponible' : 'vendido';
    });
    this.cantidad = +this.localService.getData('cantidad')!;
  }

  selectedIcons: string[] = [];
  
  toggleState(icon: any) {
    if (icon.state === 'disponible') {
      if (this.selectedIcons.length >= this.cantidad) {
        return;
      }
      this.selectedIcons.push(icon.identificador);
      icon.state = 'clicked';
    } else if (icon.state === 'clicked') {
      const index = this.selectedIcons.indexOf(icon.identificador);
      if (index !== -1) {
        this.selectedIcons.splice(index, 1);
      }
      icon.state = 'disponible';
    }
  }

  getAsientosPorFila(fila: number) {
    const asientosPorFila = this.horario.sala.asientos_por_fila;
    const inicio = (fila - 1) * asientosPorFila;
    const fin = inicio + asientosPorFila;
    return this.horario.asientos.slice(inicio, fin);
  }

  getFilas() {
    return Array(this.horario.sala.filas)
      .fill(0)
      .map((_, index) => index + 1);
  }

  async submitAsientos() {
    try {
      console.log(this.selectedIcons);
      const response = await this.dashboardService.changeAsientosDisponible(
        this.selectedIcons,
        this.horario.id.toString()
      );
      if (response.message == 'Asientos comprados') {
        console.log('test');
        this.router.navigate(['/']);
      }
    } catch (err) {}
  }
}
