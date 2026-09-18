import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  checkUserExists(email: string): Observable<boolean> {
    const exists = email === 'test@test.com';
    return of(exists).pipe(delay(800));
  }
}
