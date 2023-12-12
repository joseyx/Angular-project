import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TestComponent } from '../../nav/test.component';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

interface Response {
  response: {
    data: {
      message: string;
    };
  };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    TestComponent,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  alreadyRegistered: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  applyForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async submitRegister() {
    try {
      if (
        !this.applyForm.getError('name') &&
        !this.applyForm.getError('email') &&
        !this.applyForm.getError('password')
      ) {
        const response = await this.authService.register(
          this.applyForm.value.name ?? '',
          this.applyForm.value.email ?? '',
          this.applyForm.value.password ?? ''
        );
        this.router.navigate(['/']);
      }
    } catch (error) {
      if ((error as Response).response.data.message) {
        this.alreadyRegistered = true;
      }
    }
  }
}
