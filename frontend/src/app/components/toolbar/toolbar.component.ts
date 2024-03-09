import { Component, Input, inject, afterNextRender } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';
import { RoleService } from '../../services/role.service';
import { AsyncPipe } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../modules/user/user.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    AsyncPipe,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input() matDrawerShow!: MatDrawer;
  _router: Router = inject(Router);
  private roleService: RoleService = inject(RoleService);
  private userService: UserService = inject(UserService);
  role$ = this.roleService.role$;

  title: string = '';

  ngOnInit() {
    this.userService.isNew();
    const role = sessionStorage.getItem('role');
    const token = sessionStorage.getItem('token');
    if (role && token) {
      this.roleService.sendData(role);
    }
  }

  logout() {
    const isLeave = confirm('¿are you sure you want to leave?');

    if (isLeave) {
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('token');
      this.roleService.sendData('');
      this._router.navigate(['/']);
    }
  }

  goTo() {
    this._router.navigate(['/'], { queryParams: { title: this.title } });
  }
}
