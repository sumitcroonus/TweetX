import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { SnackbarService } from 'src/app/shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private readonly authService = inject(AuthService);
  private readonly snackbarService = inject(SnackbarService);


  visiblity = false;

  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  togglePasswordVisiblity() {
    this.visiblity = !this.visiblity;
  }

  login() {
    if (this.loginForm.valid) {
      this.authService.logIn(
        this.loginForm.get('email')?.value!,
        this.loginForm.get('password')?.value!
      );
    }
  }

  forgotPassword(){
    this.snackbarService.toggleSnackbar("Not Implemented!")
  }
}
