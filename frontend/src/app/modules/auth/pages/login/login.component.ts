import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RoleService } from '../../../../services/role.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm!: FormGroup;

  private authService: AuthService = inject(AuthService);
  private roleService: RoleService = inject(RoleService);
  private formBuilder: FormBuilder = inject(FormBuilder);
  private _router: Router = inject(Router);

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  login() {
    const body = this.loginForm.value;
    this.authService.login(body).subscribe((data) => {
      sessionStorage.setItem('token', data.token);
      sessionStorage.setItem('role', data.role);
      this.roleService.sendData(data.role);
      this._router.navigate(['/']);
    });
  }
  resetLoginForm() {
    this.loginForm.reset();
  }
  focus(input: HTMLElement) {
    input.focus();
  }
}
