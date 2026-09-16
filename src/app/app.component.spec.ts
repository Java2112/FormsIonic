import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app.component';

/**
 * Pruebas unitarias para `AppComponent`.
 * 
 * Verifica que el componente raíz de la aplicación se instancie correctamente
 * junto con sus proveedores mínimos (enrutador).
 */
describe('AppComponent', () => {
  /**
   * Caso de prueba: Comprobar la creación exitosa del componente raíz.
   */
  it('should create the app', async () => {
    // Configuración del módulo de prueba simulando el entorno de ejecución
    await TestBed.configureTestingModule({
      imports: [AppComponent], // Componente Standalone bajo prueba
      providers: [provideRouter([])] // Enrutador simulado requerido por IonRouterOutlet
    }).compileComponents();
    
    // Instanciación del componente y fixture de pruebas
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    
    // Aserción: el componente debe haberse creado sin errores
    expect(app).toBeTruthy();
  });
});

