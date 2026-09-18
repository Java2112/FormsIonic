import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { firstValueFrom } from 'rxjs';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return true if email is test@test.com', async () => {
    const exists = await firstValueFrom(service.checkUserExists('test@test.com'));
    expect(exists).toBe(true);
  });

  it('should return false if email is not test@test.com', async () => {
    const exists = await firstValueFrom(service.checkUserExists('user@example.com'));
    expect(exists).toBe(false);
  });
});
