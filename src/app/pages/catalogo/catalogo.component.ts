//MUESTRA TODOS LOS JUEGOS QUE EXISTEN EN LA PAGINA PIXELHOSHI
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Juego {
  id: number;
  nombre: string;
  genero: string;
  anio: number;
  portada: string;
  puntaje: number;
}

@Component({
  selector: 'app-catalogo',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './catalogo.component.html',
  styleUrl: './catalogo.component.css',
})
export class CatalogoComponent {

  juegos: Juego[] = [
    {
      id: 1,
      nombre: 'Kena Bridge Of Spirits',
      genero: 'Aventura',
      anio: 2021,
      portada: 'assets/img/Kena.jpg',
      puntaje: 4.7,
    },
    {
      id: 2,
      nombre: 'Final Fantasy XIV',
      genero: 'MMORPG',
      anio: 2013,
      portada: 'assets/img/Final_fantasy_xiv.jpg',
      puntaje: 4.6,
    },
    {
      id: 3,
      nombre: 'Uncharted: The Nathan Drake Collection',
      genero: 'Aventura',
      anio: 2015,
      portada: 'assets/img/uncharted.jpg',
      puntaje: 3.9,
    },
    {
      id: 4,
      nombre: 'Spyro Reignited Trilogy',
      genero: 'Aventura',
      anio: 2018,
      portada: 'assets/img/Spyro.jpg',
      puntaje: 4.8,
    },
  ];

  getEstrellas(puntaje: number): string {
    const e = Math.round(puntaje);
    const llenas = '⭐'.repeat(e);
    const vacias = '☆'.repeat(5 - e);
    return llenas + vacias;
  }
}
