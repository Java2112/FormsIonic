import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  getConfig(): Observable<any> {
    const mockConfig = {
      defaultAge: 18,
      roles: ['admin', 'user', 'guest']
    };
    return of(mockConfig).pipe(delay(500));
  }

  checkUserExists(email: string): Observable<boolean> {
    const exists = email === 'test@test.com';
    return of(exists).pipe(delay(800));
  }

  submitForm(data: any): Observable<any> {
    const response = {
      success: true,
      message: 'Formulario enviado correctamente',
      data: data
    };
    return of(response).pipe(delay(1000));
  }
}
