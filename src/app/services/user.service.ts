import { Injectable } from '@angular/core'; // Decorador de Angular para inyección de dependencias
import { Observable, of } from 'rxjs'; // Clases fundamentales de RxJS para programación reactiva
import { delay } from 'rxjs/operators'; // Operador de tiempo para simular la espera de respuesta del backend

@Injectable({
  providedIn: 'root' // El servicio es una instancia única (Singleton) en la raíz del proyecto
})
export class UserService {

  // Método para validar la existencia de un usuario mediante su correo electrónico
  checkUserExists(email: string): Observable<boolean> {
    // Evalúa si el correo consultado es 'test@test.com' (correo simulado que ya existe en BD)
    const exists = email === 'test@test.com';

    // Emite el booleano 'exists' como un Observable tras un tiempo simulado de 800 milisegundos
    return of(exists).pipe(delay(800));
  }
}
