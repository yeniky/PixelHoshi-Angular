// PERFIL QUE SOLO SE GATILLA CUANDO SE ESTA REGISTRADO

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

interface Usuario {
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
}

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent implements OnInit {
  // correo del usuario logeado
  usuarioActual: string | null = null;

  // formulario para cambiar password
  formPassword: FormGroup;

  // mensajes para feedback
  mensaje = '';
  mensajeTipo: 'success' | 'danger' | '' = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.formPassword = this.fb.group({
      nuevaPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          // 1 mayúscula, 1 número, 1 símbolo
          Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    // lee el usuario que dejó el login en localStorage
    this.usuarioActual = localStorage.getItem('usuarioActual');
  }

  get f() {
    return this.formPassword.controls;
  }

  private cargarUsuarios(): Usuario[] {
    let usuarios: Usuario[] = [];
    try {
      const raw = localStorage.getItem('usuarios');
      usuarios = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(usuarios)) usuarios = [];
    } catch {
      usuarios = [];
    }
    return usuarios;
  }
/**
 * Actualiza la contraseña del usuario actual.
 *
 * - Valida el formulario de nueva contraseña.
 * - Busca el usuario en localStorage y reemplaza su password.
 * - Muestra un mensaje de éxito.
 * - Cierra la sesión y redirige a la pantalla de login
 *   para que el usuario vuelva a entrar con la nueva clave.
 */
  guardar(): void {
    this.mensaje = '';
    this.mensajeTipo = '';

    if (this.formPassword.invalid) {
      this.formPassword.markAllAsTouched();
      return;
    }

    if (!this.usuarioActual) {
      this.mensaje = 'No hay sesión activa.';
      this.mensajeTipo = 'danger';
      return;
    }

    const nuevaPassword = this.formPassword.value.nuevaPassword as string;

    const usuarios = this.cargarUsuarios();

    const idx = usuarios.findIndex(
      (u) => u.email.toLowerCase() === this.usuarioActual!.toLowerCase()
    );

    if (idx === -1) {
      this.mensaje = 'No se encontró el usuario en el sistema.';
      this.mensajeTipo = 'danger';
      return;
    }

    // Actualizar contraseña
    usuarios[idx] = { ...usuarios[idx], password: nuevaPassword };
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // se fuerza a que el usuario vuelva a iniciar sesion
    localStorage.removeItem('usuarioActual');
    localStorage.removeItem('rolActual');

    this.mensaje =
      'Contraseña actualizada correctamente. Debes volver a iniciar sesión.';
    this.mensajeTipo = 'success';

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
