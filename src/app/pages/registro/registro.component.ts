import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

interface Usuario {
  email: string;
  password: string;
  rol: 'admin' | 'usuario';
}

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  formRegistro: FormGroup;
  mensaje = '';
  mensajeTipo: 'success' | 'danger' | '' = '';

  constructor(private fb: FormBuilder, private router: Router) {
    this.formRegistro = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            // 1 mayúscula, 1 número, 1 símbolo
            Validators.pattern(/^(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).+$/),
          ],
        ],
        repetirPassword: ['', [Validators.required]],
      },
      {
        validators: [this.passwordsIgualesValidator],
      }
    );
  }

  get f() {
    return this.formRegistro.controls;
  }

  // Validador para que password y repetirPassword coincidan
  private passwordsIgualesValidator(
    group: AbstractControl
  ): ValidationErrors | null {
    const pass = group.get('password')?.value;
    const rep = group.get('repetirPassword')?.value;

    if (!pass || !rep) return null;
    return pass === rep ? null : { noCoincide: true };
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

  private guardarUsuarios(usuarios: Usuario[]) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
  }

  onSubmit(): void {
    this.mensaje = '';
    this.mensajeTipo = '';

    if (this.formRegistro.invalid) {
      this.formRegistro.markAllAsTouched();
      return;
    }

    const { email, password } = this.formRegistro.value as {
      email: string;
      password: string;
    };

    const usuarios = this.cargarUsuarios();

    // Verificar si ya existe un usuario con ese correo
    if (
      usuarios.some(
        (u) => u.email.toLowerCase() === email.trim().toLowerCase()
      )
    ) {
      this.mensaje = 'Ya existe una cuenta con ese correo.';
      this.mensajeTipo = 'danger';
      return;
    }

    // Crear nuevo usuario con rol "usuario"
    const nuevo: Usuario = {
      email: email.trim(),
      password,
      rol: 'usuario',
    };

    usuarios.push(nuevo);
    this.guardarUsuarios(usuarios);

    this.mensaje = 'Cuenta creada correctamente. Ahora puedes iniciar sesión.';
    this.mensajeTipo = 'success';

    // Opcional: redirigir al login después de un momento
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 1500);
  }
}
