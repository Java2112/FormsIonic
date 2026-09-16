import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular';

/**
 * Componente principal (raíz) de la aplicación.
 * 
 * En Ionic Framework, este componente actúa como el cascarón o marco contenedor
 * donde se alojarán todas las páginas y vistas de la aplicación móvil.
 */
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  /**
   * Importaciones necesarias para Angular Standalone:
   * - `IonApp`: Componente obligatorio que envuelve toda la aplicación Ionic.
   * - `IonRouterOutlet`: Salida de enrutamiento especializada con soporte para animaciones nativas.
   */
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  /**
   * Constructor del componente raíz.
   * Puede emplearse para inicializaciones tempranas (plugins de Capacitor, splash screen, temas, etc.).
   */
  constructor() {}
}

