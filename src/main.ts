import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withComponentInputBinding, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

/**
 * Punto de entrada principal de la aplicación Ionic + Angular (arquitectura Standalone).
 * 
 * Aquí se inicializa la aplicación llamando a `bootstrapApplication()` y se configuran
 * los proveedores globales (`providers`), especialmente los esenciales para Ionic Framework.
 */
bootstrapApplication(AppComponent, {
  providers: [
    /**
     * ESTRATEGIA DE REUTILIZACIÓN DE RUTAS DE IONIC:
     * En aplicaciones móviles, los usuarios esperan volver a la pantalla anterior sin perder
     * su posición de scroll ni el estado de los componentes.
     * `IonicRouteStrategy` intercepta el enrutamiento estándar de Angular para mantener vivas
     * las vistas en el historial (navegación tipo pila / stack), permitiendo transiciones nativas fluidas.
     */
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },

    /**
     * INICIALIZADOR GLOBAL DE IONIC FRAMEWORK:
     * `provideIonicAngular()` es la función clave que inicializa todo el ecosistema de Ionic:
     * 1. Carga y registra los Web Components nativos de Ionic (`ion-*`).
     * 2. Detecta automáticamente la plataforma (iOS o Android/Material Design) y adapta estilos e interacciones.
     * 3. Configura el soporte para gestos táctiles (como swipe-back en iOS), modales, alertas y comportamiento del teclado móvil.
     */
    provideIonicAngular(),

    /**
     * CONFIGURACIÓN DEL ENRUTADOR DE ANGULAR:
     * - `routes`: Define el mapa de rutas y páginas de la app.
     * - `withPreloading(PreloadAllModules)`: Precarga en segundo plano las rutas que usan lazy loading para máxima rapidez en móviles.
     * - `withComponentInputBinding()`: Permite vincular parámetros de URL directamente a `@Input()` en componentes.
     */
    provideRouter(routes, withPreloading(PreloadAllModules), withComponentInputBinding()),
  ],
});

