import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, CommonModule],   // aquí va CommonModule para *ngIf
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'PixelHoshi';

  constructor(private router: Router) {}

  // Esto indica si hay usuario logeado o no
  get isLoggedIn(): boolean {
    return !!localStorage.getItem('usuarioActual');
  }

  logout() {
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('rolActual');
    this.router.navigate(['/inicio']);
  }
}
