import { Routes } from '@angular/router';

/**
 * Definición del árbol de rutas de la aplicación.
 * 
 * En Ionic + Angular se utiliza carga diferida (Lazy Loading) mediante `loadComponent`,
 * lo cual optimiza el rendimiento móvil al descargar únicamente el código de la página
 * que el usuario está visitando en ese momento.
 */
export const routes: Routes = [
  {
    path: 'home',
    // Carga diferida de la página principal: reduce el tiempo de arranque de la app
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },
  {
    path: '',
    // Redirige la raíz de la aplicación hacia la ruta '/home' por defecto
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

