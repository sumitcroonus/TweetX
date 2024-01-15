import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent {
  private readonly authService = inject(AuthService);

  signupForm = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
    confirm: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  register() {
    if (this.signupForm.valid) {
      this.authService.signUp(
        this.signupForm.get('email')?.value!,
        this.signupForm.get('password')?.value!,
        this.signupForm.get('name')?.value!
      );
    }
  }
}
