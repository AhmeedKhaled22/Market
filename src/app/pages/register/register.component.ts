import { Component, inject, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private auth = inject(AuthService);
  private router = inject(Router);

  isloading = false;
  succesMsg = false;
  errorMsg: string | null = null;

  registerForm!: FormGroup;

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),

      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6)
      ]),

      age: new FormControl('', [
        Validators.required
      ]),

      phone: new FormControl('', [
        Validators.required
      ]),
    });
  }

  submitRegisterForm(): void {
    if (!this.registerForm || this.registerForm.invalid) return;

    this.isloading = true;
    this.errorMsg = null;
    this.succesMsg = false;

    const email = this.registerForm.get('email')?.value ?? '';
    const password = this.registerForm.get('password')?.value ?? '';

    this.auth.register(email, password)
      .then(() => {
        this.isloading = false;
        this.succesMsg = true;

        this.registerForm.reset();

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 600);
      })
      .catch(err => {
        this.isloading = false;
        this.succesMsg = false;

        switch (err.code) {
          case 'auth/email-already-in-use':
            this.errorMsg = 'Email already exists';
            break;

          case 'auth/weak-password':
            this.errorMsg = 'Password must be at least 6 characters';
            break;

          default:
            this.errorMsg = 'Something went wrong';
        }
      });
  }
}
