import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ResenaApi {
  id: number;
  gameId: number;
  puntaje: number;
  comentario: string;
  email: string;
  visible: boolean;
}

@Injectable({ providedIn: 'root' })
export class ResenasApiService {
  private url = 'https://yeniky.github.io/pixelhoshi-api/resenas.json';

  constructor(private http: HttpClient) {}

  getResenas(): Observable<ResenaApi[]> {
    return this.http.get<ResenaApi[]>(this.url);
  }
}
