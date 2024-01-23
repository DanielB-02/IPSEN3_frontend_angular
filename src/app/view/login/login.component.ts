import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AuthService} from "../../auth/auth.service";
import {UserStorageService} from "../../auth/user-storage.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  showLoginScreen: boolean = true;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
    });
  }

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {

    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    const email = this.loginForm.get('email')!.value;
    const password = this.loginForm.get('password')!.value;

    this.authService.login(email, password).subscribe(
      (res) => {

        if (UserStorageService.isCustomerLoggedIn()) {
          this.router.navigateByUrl('/main-view/dashboard');
        }

        console.log('res', res);
      },
      (error) => {
        console.log('error', error);

        if (error.status === 406) {
          this.snackBar.open(
            'User Is Not Active. Please Verify Email.',
            'ERROR',
            { duration: 5000 }
          );
        } else {
          this.snackBar.open('Bad credentials', 'ERROR', { duration: 5000 });
        }
      }
    );
  }
}
