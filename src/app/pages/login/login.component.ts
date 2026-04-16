import { Component, inject } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  isSubmitting = false;
  errorMsg: string | null = null;

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    this.isSubmitting = true;

    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? '';

    this.auth.login(email, password)
      .then(() => {
        this.isSubmitting = false;
        this.router.navigate(['/home']);
      })
      .catch(err => {
        this.isSubmitting = false;
        this.errorMsg = err.message;
      });
  }

  loginWithGoogle() {
    this.auth.loginWithGoogle()
      .then(() => this.router.navigate(['/home']))
      .catch(err => this.errorMsg = err.message);
  }

  loginWithFacebook() {
    this.auth.loginWithFacebook()
      .then(() => this.router.navigate(['/home']))
      .catch(err => this.errorMsg = err.message);
  }
}
