import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

/**
 * Servicio de datos que simula la comunicación con un backend o API REST externa.
 * 
 * Utiliza RxJS (`Observable`, `of`, `delay`) para simular la latencia de red y respuestas
 * asíncronas típicas en aplicaciones móviles Ionic/Angular.
 */
@Injectable({
  providedIn: 'root' // Registra este servicio como singleton en la raíz del inyector de Angular
})
export class DataService {

  /**
   * Constructor del servicio.
   * Angular se encarga de instanciar e inyectar dependencias necesarias aquí si se requieren.
   */
  constructor() { }

  /**
   * Obtiene la configuración inicial para los formularios de la aplicación.
   * 
   * Simula una petición HTTP GET para obtener valores predeterminados (como la edad por defecto)
   * y catálogos (como los roles disponibles).
   * 
   * @returns Observable<any> Emite el objeto de configuración simulado tras un retardo de 500ms.
   */
  getConfig(): Observable<any> {
    const mockConfig = {
      defaultAge: 18,
      roles: ['admin', 'user', 'guest']
    };
    // 'of' crea un flujo observable a partir del objeto y 'delay' simula el tiempo de respuesta del servidor.
    return of(mockConfig).pipe(delay(500));
  }

  /**
   * Valida de manera asíncrona si un correo electrónico ya está registrado en el sistema.
   * 
   * Esta función es útil para simular validaciones remotas (por ejemplo, validación de unicidad
   * de usuario) antes o durante el envío del formulario.
   * 
   * @param email Dirección de correo electrónico que se desea verificar.
   * @returns Observable<boolean> Emite `true` si el correo ya existe ('test@test.com'), o `false` en caso contrario, con 800ms de retraso.
   */
  checkUserExists(email: string): Observable<boolean> {
    // Para propósitos didácticos, el correo 'test@test.com' simula un usuario ya existente.
    const exists = email === 'test@test.com';
    return of(exists).pipe(delay(800));
  }

  /**
   * Envía los datos recopilados en el formulario reactivo hacia el servidor (simulado).
   * 
   * En una aplicación real de producción, este método realizaría un `HttpClient.post()`
   * hacia una API remota.
   * 
   * @param data Objeto con los valores ingresados por el usuario en el formulario (name, email, age).
   * @returns Observable<any> Emite una respuesta simulada de éxito junto con un mensaje y los datos recibidos, tras 1000ms.
   */
  submitForm(data: any): Observable<any> {
    const response = {
      success: true,
      message: 'Formulario enviado correctamente',
      data: data
    };
    return of(response).pipe(delay(1000));
  }
}
