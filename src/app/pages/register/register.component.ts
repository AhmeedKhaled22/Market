import { AuthService } from '../../core/services/auth/auth';
import { Component, inject } from '@angular/core';
import {
  FormGroup,
  FormControl,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {

  private readonly auth: AuthService = inject(AuthService);
  private readonly router = inject(Router);

  isloading: boolean = false;
  succesMsg: boolean = false;
  errorMsg: boolean = false;

  registerForm: FormGroup = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    email: new FormControl(null, [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^[A-Z]\w{6,}$/),
    ]),
    age: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^(1[0-9]|[2-7][0-9]|80)$/),
    ]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
  });

  submitRegisterForm(): void {
    this.isloading = true;

    this.auth.sendRegisterData(this.registerForm.value).subscribe({
      next: (res: any) => {
        this.isloading = false;

        if (res.msg === 'done') {
          this.succesMsg = true;

          setTimeout(() => {
            this.registerForm.reset();
            this.router.navigate(['/login']); // ✅ تحويل للوجن
          }, 1000);
        }
      },

      error: (err: HttpErrorResponse) => {
        console.log(err);
        this.isloading = false;
        this.succesMsg = false;
        this.errorMsg = true;
      },
    });
  }
}
