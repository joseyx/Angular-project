import { Component, inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TestComponent } from '../../nav/home.component';

import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { confirmPasswordValidator } from '../../validators/passwords-match.validator';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [TestComponent, ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css',
})
export class ResetPasswordComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  private token = this.route.snapshot.params['token'] ?? null;
  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }

  resetPasswordForm = new FormGroup(
    {
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    },
    { validators: confirmPasswordValidator }
  );

  async test() {
    console.log('Test');
  }

  async submitResetPassword() {
    try {
      console.log(this.resetPasswordForm.errors);
      if (!this.resetPasswordForm.errors) {
        const response = await this.authService.resetPassword(
          this.token,
          this.resetPasswordForm.value.email ?? '',
          this.resetPasswordForm.value.password ?? '',
          this.resetPasswordForm.value.confirmPassword ?? ''
        );
        if (response) {
          this.router.navigate(['/login']);
        } else {
          console.log(response);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
}
