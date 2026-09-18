import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AppConfig } from '../models/config.model';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  getConfig(): Observable<AppConfig> {
    const mockConfig: AppConfig = {
      defaultAge: 18,
      roles: ['admin', 'user', 'guest']
    };
    return of(mockConfig).pipe(delay(500));
  }
}
