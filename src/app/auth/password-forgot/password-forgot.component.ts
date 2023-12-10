import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';

import { TestComponent } from '../../nav/test.component';
import { AuthService } from '../../services/auth.service';

interface response {
  message: string;
}

@Component({
  selector: 'app-password-forgot',
  standalone: true,
  imports: [TestComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './password-forgot.component.html',
  styleUrl: './password-forgot.component.css',
})
export class PasswordForgotComponent {
  emailSent: boolean = false;
  error: boolean = false;
  btnStatus: boolean = false;

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  forgotForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  async submitForgot() {
    if (!this.forgotForm.getError('email')) {
      const response: response = await this.authService.forgotPassword(
        this.forgotForm.value.email ?? ''
      );
      if (response.message == 'Reset link sent to your email.') {
        this.emailSent = true;
        this.btnStatus = true;
        return;
      } else {
        this.error = true;
        this.btnStatus = true;
        return;
      }
    }
  }
}
