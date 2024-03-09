import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm!: FormGroup;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private _router: Router
  ) {}
  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register() {
    const body = this.registerForm.value;
    this.authService.register(body).subscribe((data) => {
      this._router.navigate(['/login']);
    });
  }
  resetRegisterForm() {
    this.registerForm.reset();
  }
  focus(input: HTMLElement) {
    input.focus();
  }
}
