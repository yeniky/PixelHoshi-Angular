##
## PixelHoshi - Sumativa 3 (Desarrollo Fullstack II)
##
## Descripción
Aplicación Angular enfocada en reseñas/comentarios de videojuegos llamada PixelHoshi.

## Requerimientos segun pauta de evaluación
- App desarrollada en Angular.
- Consumo de archivos JSON desde un “backend” estático GitHub Pages y visualización en el FrontEnd.
- Contiene operaciones CRUD:
  - GET: desde GitHub Pages.
  - POST / PUT / DELETE: simulados en el frontend usando localStorage.
- Docker: build y ejecución de la aplicación en contenedor.
- Documentación automática: Compodoc.

## JSON (backend estático)
Reseñas (GET):
https://yeniky.github.io/pixelhoshi-api/resenas.json

## Ejecutar en local (desarrollo)
- Instalar dependencias:
  npm install
- Ejecutar:
  ng serve -o
- URL:
  http://localhost:4200

## Docker (ejecución en contenedor)
- Build:
  docker build -t pixelhoshi .
- Run:
  docker run --rm -p 8080:80 pixelhoshi
- URL:
  http://localhost:8080

## Documentación automática (Compodoc)
- Generar:
  npm run compodoc
- Abrir:
  documentation/index.html
- npm run compodoc:serve

## Notas de funcionamiento
- Para forzar la carga desde el JSON remoto, eliminar la key de localStorage del juego correspondiente:
  resenas_game_1, resenas_game_2, etc.
- En Docker (localhost:8080) la sesión/almacenamiento puede solicitar login nuevamente por ser un origen distinto a localhost:4200.

## TRELLO
https://trello.com/b/flOhme3D/sumativa-3-semana-8-fullstask-ii