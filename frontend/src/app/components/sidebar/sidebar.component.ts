import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { Router, RouterModule } from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { RoleService } from '../../services/role.service';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    AsyncPipe,
    ToolbarComponent,
    MatIconModule,
    MatExpansionModule,

    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  constructor(private roleService: RoleService) {}
  role$ = this.roleService.role$;
  title: string = '';
  _router: Router = inject(Router);
  goTo() {
    this._router.navigate(['/'], { queryParams: { title: this.title } });
  }
}
