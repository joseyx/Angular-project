import { Component, inject } from '@angular/core';
import { TestComponent } from '../nav/test.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
  FormControl,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';

import { LocalService } from '../services/localstorage.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-cantidad-asientos',
  standalone: true,
  imports: [TestComponent, RouterModule, CommonModule, ReactiveFormsModule],
  templateUrl: './cantidad-asientos.component.html',
  styleUrl: './cantidad-asientos.component.css',
})
export class CantidadAsientosComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  private id = this.route.snapshot.params['id'] ?? null;

  wrongsubmited: boolean = false;
  constructor(
    private localstorageService: LocalService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {
    console.log(this.id);
  }

  applyForm = new FormGroup({
    cantidad: new FormControl('', [
      Validators.required,
      Validators.min(1),
      Validators.max(10),
    ]),
  });

  async submitCantidad() {
    try {
      console.log(this.applyForm.get('cantidad')?.errors);
      if (!this.applyForm.get('cantidad')?.errors) {
        if (this.applyForm.value.cantidad == '') {
          this.wrongsubmited = true;
          return;
        }
        this.localstorageService.saveData(
          'cantidad',
          this.applyForm.value.cantidad ?? ''
        );
        this.router.navigate([`/pelicula/horario/${this.id}`]);
      } else {
      }
    } catch (error) {}
  }
}
