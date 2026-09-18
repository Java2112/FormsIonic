import { Injectable } from '@angular/core'; // Decorador para declarar este archivo como servicio inyectable
import { Observable, of } from 'rxjs'; // Herramientas de programación reactiva con RxJS
import { delay } from 'rxjs/operators'; // Operador de retardo para simular latencia en peticiones HTTP
import { UserFormData, FormSubmitResponse } from '../models/form.model'; // Importación de interfaces de datos

@Injectable({
  providedIn: 'root' // Disponible globalmente en toda la aplicación
})
export class FormService {

  // Método encargado de enviar y procesar los datos del formulario
  submitForm(data: UserFormData): Observable<FormSubmitResponse> {
    // Construcción del objeto de respuesta con estado, mensaje y los datos procesados
    const response: FormSubmitResponse = {
      success: true, // Indica que la operación concluyó sin errores
      message: 'Formulario enviado correctamente', // Texto de éxito
      data: data // Datos del usuario registrados
    };

    // Envuelve el objeto de respuesta en un Observable que se emite 1 segundo después (1000ms)
    return of(response).pipe(delay(1000));
  }
}
