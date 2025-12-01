//PAGINA DONDE SE DEJAN LOS COMENTARIOS DE UN JUEGO (DEBE ESTAR REGISTRADO PARA PODER COMENTAR)
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

interface Juego {
  id: number;
  titulo: string;
  genero: string;
  anio: string;
  rating: number;
  imagen: string;
}

interface Resena {
  id: number;
  puntaje: number;
  comentario: string;
  email: string;
  visible: boolean;
}

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.css',
})
export class GameComponent implements OnInit {
  juegos: Juego[] = [
    {
      id: 1,
      titulo: 'Kena Bridge Of Spirits',
      genero: 'Aventura',
      anio: '2021',
      rating: 4.7,
      imagen: '/assets/img/Kena.jpg',
    },
    {
      id: 2,
      titulo: 'Final Fantasy XIV: Dawntrail',
      genero: 'MMORPG',
      anio: '2013',
      rating: 4.6,
      imagen: '/assets/img/Final_fantasy_xiv.jpg',
    },
    {
      id: 3,
      titulo: 'Uncharted: The Nathan Drake Collection',
      genero: 'Aventura',
      anio: '2015',
      rating: 3.9,
      imagen: '/assets/img/uncharted.jpg',
    },
    {
      id: 4,
      titulo: 'Spyro Reignited Trilogy',
      genero: 'Aventura',
      anio: '2018',
      rating: 4.8,
      imagen: '/assets/img/Spyro.jpg',
    },
  ];

  juego!: Juego;
  resenas: Resena[] = [];
  formResena: FormGroup;
  opcionesPuntaje = [1, 2, 3, 4, 5];

  // info de sesión / permisos
  puedeComentar = false;
  esAdmin = false;
  emailActual = '';

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {
    this.formResena = this.fb.group({
      puntaje: ['', Validators.required],
      comentario: ['', [Validators.required, Validators.minLength(5)]],
    });
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.queryParamMap.get('id') ?? '1');
    this.juego = this.juegos.find((j) => j.id === id) ?? this.juegos[0];

    this.inicializarUsuario();
    this.cargarResenas();
  }

  // ==== Sesión / roles ====

  private inicializarUsuario(): void {
    const email = localStorage.getItem('usuarioActual');
    const rol = localStorage.getItem('rolActual');

    this.puedeComentar = !!email;
    this.emailActual = email ?? '';
    this.esAdmin = rol === 'admin';
  }

  // ==== LocalStorage reseñas ====

  private storageKey(): string {
    return `resenas_game_${this.juego.id}`;
  }

  private cargarResenas(): void {
    try {
      const raw = localStorage.getItem(this.storageKey());
      const arr = raw ? JSON.parse(raw) : [];

      // normalizamos para asegurar que siempre encuentre "visible"
      this.resenas = (Array.isArray(arr) ? arr : []).map((r: any) => ({
        id: r.id,
        puntaje: r.puntaje,
        comentario: r.comentario,
        email: r.email,
        visible: r.visible !== false, // por defecto true
      }));
    } catch {
      this.resenas = [];
    }
  }

  private guardarResenas(): void {
    localStorage.setItem(this.storageKey(), JSON.stringify(this.resenas));
  }

  // === helpers para el template ===
  get resenasVisibles(): Resena[] {
    return this.resenas.filter((r) => r.visible);
  }

  get cantidadResenasVisibles(): number {
    return this.resenasVisibles.length;
  }

  // ==== Acciones ====

  publicar(): void {
    if (!this.puedeComentar) {
      alert('Debes iniciar sesión para agregar una reseña.');
      return;
    }

    if (this.formResena.invalid) {
      this.formResena.markAllAsTouched();
      return;
    }

    const valores = this.formResena.value as {
      puntaje: number | string;
      comentario: string;
    };

    const nueva: Resena = {
      id: Date.now(),
      puntaje: Number(valores.puntaje),
      comentario: valores.comentario,
      email: this.emailActual || 'anonimo@pixelhoshi.com',
      visible: true, // nueva reseña siempre visible
    };

    this.resenas.push(nueva);
    this.guardarResenas();
    this.formResena.reset();
  }

  eliminarResena(id: number): void {
    if (!this.esAdmin) return;

    this.resenas = this.resenas.filter((r) => r.id !== id);
    this.guardarResenas();
  }

  toggleVisibilidad(id: number): void {
    if (!this.esAdmin) return;

    const r = this.resenas.find((x) => x.id === id);
    if (r) {
      r.visible = !r.visible;
      this.guardarResenas();
    }
  }
}
