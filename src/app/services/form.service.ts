import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { UserFormData, FormSubmitResponse } from '../models/form.model';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  submitForm(data: UserFormData): Observable<FormSubmitResponse> {
    const response: FormSubmitResponse = {
      success: true,
      message: 'Formulario enviado correctamente',
      data: data
    };
    return of(response).pipe(delay(1000));
  }
}
