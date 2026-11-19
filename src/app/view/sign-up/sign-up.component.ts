import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {AuthService} from "../../auth/auth.service";
import {RoleService} from "../../services/role.service";
import {Role} from "../../model/role/role";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  signupForm!: FormGroup;
  isSpinning = false;
  hidePassword = true;
  roles: Role[] = [];


  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private roleService: RoleService
  ) { }


  ngOnInit(): void {
    this.roleService.readAll().subscribe(data => {
      this.roles = data;
    })
    this.signupForm = this.fb.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [ Validators.required]],
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]],
      roleId: [null, [Validators.required]]
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

      this.authService.register(this.signupForm.value).subscribe(
        () => {
          this.isSpinning = false;
          this.snackBar.open('Sign up successful!', 'Close', { duration: 5000 });
          this.router.navigateByUrl("/main-view/adminpanel");
        },
        () => {
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
}
