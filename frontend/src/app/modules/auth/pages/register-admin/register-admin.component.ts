import { Component, inject } from '@angular/core';
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
  selector: 'app-register-admin',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './register-admin.component.html',
  styleUrl: './register-admin.component.css',
})
export class RegisterAdminComponent {
  registerForm!: FormGroup;

  private authService: AuthService = inject(AuthService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  register() {
    const body = this.registerForm.value;
    this.authService.registerFirstAdmin(body).subscribe((data) => {
      sessionStorage.removeItem('start');
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
