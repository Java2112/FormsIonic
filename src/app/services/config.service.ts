import { Injectable } from '@angular/core'; // Decorador para registrar la clase en la inyección de dependencias de Angular
import { Observable, of } from 'rxjs'; // RxJS: Observable representa un flujo de datos asíncrono; of crea un observable a partir de un valor
import { delay } from 'rxjs/operators'; // Operador de RxJS para retardar la emisión de datos simulando latencia de red
import { AppConfig } from '../models/config.model'; // Importación de la interfaz de configuración

@Injectable({
  providedIn: 'root' // Define que el servicio estará disponible globalmente en toda la aplicación (Singleton)
})
export class ConfigService {

  // Método público que retorna un Observable con la configuración de la app
  getConfig(): Observable<AppConfig> {
    // Objeto con los datos de configuración inicial simulados
    const mockConfig: AppConfig = {
      defaultAge: 18, // Edad inicial predeterminada
      roles: ['admin', 'user', 'guest'] // Lista de roles del sistema
    };

    // 'of' envuelve el objeto en un Observable y 'pipe(delay(500))' simula una respuesta HTTP de 500ms
    return of(mockConfig).pipe(delay(500));
  }
}
