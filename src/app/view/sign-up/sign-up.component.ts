import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import { MatInput } from "@angular/material/input";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  isSpinning = false;
  hidePassword = true;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [ Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      fictRole: [false],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {

    if (this.signupForm.valid) {
      const password = this.signupForm.get('password')?.value;
      const confirmPassword = this.signupForm.get('confirmPassword')?.value;

      if (password !== confirmPassword) {
        this.snackBar.open('Passwords do not match.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        return;
      }

      this.isSpinning = true;

      // Perform the signup logic here
      // Example: Assuming you have an AuthService with a signup method
      this.authService.register(this.signupForm.value).subscribe(
        (response) => {
          this.isSpinning = false;
          console.log(response);
          this.snackBar.open('Sign up successful!', 'Close', { duration: 5000 });
          // Navigate to the login page or perform any other action
          this.router.navigateByUrl("/main-view/adminpanel");
        },
        (error) => {
          this.isSpinning = false;
          this.snackBar.open('Sign up failed. Please try again.', 'Close', { duration: 5000, panelClass: 'error-snackbar' });
        }
      );
    } else {
      for (const i in this.signupForm.controls) {
        this.signupForm.controls[i].markAsDirty();
        this.signupForm.controls[i].updateValueAndValidity();
      }
    }
  }

  public setFictRole(fictRole: boolean) {
    this.signupForm.get('fictRole').setValue(fictRole);
    console.log(this.signupForm.get('fictRole'));
  }
}
