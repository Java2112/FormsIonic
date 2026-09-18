import { TestBed } from '@angular/core/testing';
import { ConfigService } from './config.service';
import { firstValueFrom } from 'rxjs';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return app config with defaultAge and roles', async () => {
    const config = await firstValueFrom(service.getConfig());
    expect(config).toBeDefined();
    expect(config.defaultAge).toBe(18);
    expect(config.roles).toContain('admin');
  });
});
