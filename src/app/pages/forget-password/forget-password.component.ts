import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent {

  forgetForm: FormGroup;
  isSubmitting = false;
  isSuccess = false;
  errorMessage = '';

  constructor(private fb: FormBuilder) {
    this.forgetForm = this.fb.group({

      email: ['', [Validators.required, Validators.email]]

    });
  }

  async onSubmit() {

    if (this.isSubmitting) return;

    this.forgetForm.markAllAsTouched();
    if (this.forgetForm.invalid) return;

    this.isSubmitting = true;
    this.isSuccess = false;
    this.errorMessage = '';

    // ⬇️ هنا بدل Firebase
    setTimeout(() => {
      this.isSuccess = true;
      this.forgetForm.reset();
      this.isSubmitting = false;
    }, 800);
  }

}
