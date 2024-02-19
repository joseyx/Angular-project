import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';

import { TestComponent } from '../../nav/home.component';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TestComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  applyForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  async submitLogin() {
    try {
      if (
        !this.applyForm.getError('email') &&
        !this.applyForm.getError('password')
      ) {
        const response = await this.authService.login(
          this.applyForm.value.email ?? '',
          this.applyForm.value.password ?? ''
        );
        console.log(response);
        this.router.navigate(['/']);
      } else {
      }
    } catch (error) {}
  }
}
