// RECUPERAR LA CONTRASEÑA


import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

interface Usuario {
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
}

@Component({
  selector: 'app-recuperar-clave',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css',
})
export class RecuperarClaveComponent {
  formRecuperar: FormGroup;

  mensaje: string | null = null;
  tipoMensaje: 'success' | 'danger' | null = null;

  constructor(private fb: FormBuilder) {
    this.formRecuperar = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() {
    return this.formRecuperar.controls;
  }

  /**
 * Simula el envío de un enlace de recuperación de contraseña.
 *
 * - Valida que el email tenga formato correcto.
 * - Muestra un mensaje informando que se envió el correo.
 * - No manda correos reales, solo actualiza la vista para efectos de demo.
 */
  onSubmit(): void {
    if (this.formRecuperar.invalid) {
      this.formRecuperar.markAllAsTouched();
      return;
    }

    const email = (this.formRecuperar.value.email as string).toLowerCase();

    // Lee los usuarios desde localStorage
    let usuarios: Usuario[] = [];
    try {
      const raw = localStorage.getItem('usuarios');
      usuarios = raw ? JSON.parse(raw) : [];
      if (!Array.isArray(usuarios)) usuarios = [];
    } catch {
      usuarios = [];
    }

    const existe = usuarios.some(
      (u) => u.email.toLowerCase() === email
    );

    if (existe) {
      // Aquí si estuviera conectada a una base de datos se enviaría un correo.
      this.mensaje = 'Se ha enviado un enlace para recuperar la contraseña, favor de revisar su correo.';
      this.tipoMensaje = 'success';
    } else {
      // busca si existe el usuario y en caso de que no, arroja el mensaje
      this.mensaje = 'No existe un usuario registrado con ese correo.';
      this.tipoMensaje = 'danger';
    }
  }
}
