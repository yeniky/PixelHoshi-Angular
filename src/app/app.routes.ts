import { Routes } from '@angular/router';
import { InicioComponent } from './pages/inicio/inicio.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { RecuperarClaveComponent } from './pages/recuperar-clave/recuperar-clave.component';
import { CatalogoComponent } from './pages/catalogo/catalogo.component';
import { GameComponent } from './pages/game/game.component';
import { PerfilComponent } from './pages/perfil/perfil.component';

export const routes: Routes = [
  { path: '', component: InicioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'recuperar-clave', component: RecuperarClaveComponent },
  { path: 'catalogo', component: CatalogoComponent },
  { path: 'game', component: GameComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '' },
];
