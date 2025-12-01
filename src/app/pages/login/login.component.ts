// INICIAR SESION - EXISTEN 2 ROLES (ADMIN/USER)

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
/**
 * Representa un usuario básico de PixelHoshi almacenado en localStorage.
 */
interface Usuario {
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  ngOnInit(): void {
    this.asegurarSeeds();
  }

  get f() {
    return this.formLogin.controls;
  }
/**
 * Asegura que existan cuentas de ejemplo en localStorage.
 *
 * Si no están creados los usuarios demo "admin@pixelhoshi.com" y "user@pixelhoshi.com",
 * los agrega al arreglo de usuarios en localStorage.
 */
  private asegurarSeeds(): void {
    let usuarios: Usuario[] = [];

    try {
      const raw = localStorage.getItem('usuarios');
      usuarios = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(usuarios)) usuarios = [];
    } catch {
      usuarios = [];
    }

    const seeds: Usuario[] = [
      { email: 'admin@pixelhoshi.com', password: 'Admin*123', rol: 'admin' },
      { email: 'user@pixelhoshi.com', password: 'User*1234', rol: 'usuario' },
    ];

    let cambio = false;
    seeds.forEach((s) => {
      if (!usuarios.some((u) => u.email.toLowerCase() === s.email.toLowerCase())) {
        usuarios.push(s);
        cambio = true;
      }
    });

    if (cambio) {
      localStorage.setItem('usuarios', JSON.stringify(usuarios));
    }
  }
/**
 * Maneja el envío del formulario de inicio de sesión.
 *
 * - Valida el formulario.
 * - Busca el usuario en localStorage.
 * - Si las credenciales son correctas, guarda email y rol en localStorage y redirige al catálogo.
 * - Si son incorrectas, muestra un mensaje de error.
 */
  onSubmit(): void {
    if (this.formLogin.invalid) {
      this.formLogin.markAllAsTouched();
      return;
    }

    const { email, password } = this.formLogin.value as {
      email: string;
      password: string;
    };

    let usuarios: Usuario[] = [];
    try {
      const raw = localStorage.getItem('usuarios');
      usuarios = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(usuarios)) usuarios = [];
    } catch {
      usuarios = [];
    }

    const u = usuarios.find(
      (x) => x.email.toLowerCase() === email.toLowerCase()
    );

    if (u && u.password === password) {
      localStorage.setItem('usuarioActual', u.email);
      localStorage.setItem('rolActual', u.rol);
      alert('Ingreso correcto');
      this.router.navigate(['/catalogo']);
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
