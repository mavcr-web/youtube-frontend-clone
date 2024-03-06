import { Component, Input, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule, MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css',
})
export class ToolbarComponent {
  @Input() matDrawerShow!: MatDrawer;
  _router: Router = inject(Router);

  logout() {
    /* funcion para desloguear y volver al login */
    const isLeave = confirm('¿are you sure you want to leave?');

    if (isLeave) {
      sessionStorage.removeItem('role');
      sessionStorage.removeItem('token');
      this._router.navigate(['/auth/login']);
    }
  }
}
