import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import {
  Auth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence
} from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  private auth = inject(Auth);
  private router = inject(Router);
  private fb = inject(FormBuilder);

  private googleProvider = new GoogleAuthProvider();
  private facebookProvider = new FacebookAuthProvider();

  errorMsg: string = '';
  isSubmitting: boolean = false;

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    remember: [false]
  });

  async onSubmit() {

    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) return;

    this.isSubmitting = true;
    this.errorMsg = '';

    const { email, password, remember } = this.loginForm.value;

    try {

      await setPersistence(
        this.auth,
        remember ? browserLocalPersistence : browserSessionPersistence
      );

      await signInWithEmailAndPassword(this.auth, email, password);

      this.router.navigate(['/home']);

    } catch (error: any) {

      switch (error.code) {

        case 'auth/user-not-found':
          this.errorMsg = 'This account is not registered';
          break;

        case 'auth/wrong-password':
          this.errorMsg = 'Incorrect password';
          break;

        case 'auth/invalid-email':
          this.errorMsg = 'Invalid email format';
          break;

        case 'auth/invalid-credential':
          this.errorMsg = 'Invalid email or password';
          break;

        case 'auth/too-many-requests':
          this.errorMsg = 'Too many attempts. Try again later';
          break;

        default:
          this.errorMsg = 'Login failed. Please try again';
      }

    }

    this.isSubmitting = false;
  }

async loginWithGoogle() {
  try {

    const result = await signInWithPopup(this.auth, this.googleProvider);
    const user = result.user;

    console.log(user);

    this.router.navigate(['/home']);

  } catch (error: any) {
    this.errorMsg = error.code || 'Google login failed';
  }
}
  async loginWithFacebook() {
    try {

      await signInWithPopup(this.auth, this.facebookProvider);
      this.router.navigate(['/home']);

    } catch (error: any) {
      this.errorMsg = error.code || 'Facebook login failed';
    }
  }

}
