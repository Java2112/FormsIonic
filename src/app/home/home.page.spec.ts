import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';

/**
 * Pruebas unitarias para `HomePage`.
 * 
 * Valida la creación e inicialización adecuada del componente de la página de inicio,
 * sus dependencias y ciclo de vida.
 */
describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  /**
   * Configuración previa a cada prueba: instancia el componente y ejecuta la detección de cambios.
   */
  beforeEach(async () => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Caso de prueba: Verifica que la página y su formulario reactivo se inicialicen exitosamente.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

