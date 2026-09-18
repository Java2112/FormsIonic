import { TestBed } from '@angular/core/testing';
import { FormService } from './form.service';
import { UserFormData } from '../models/form.model';
import { firstValueFrom } from 'rxjs';

describe('FormService', () => {
  let service: FormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should process and return form submission success', async () => {
    const mockData: UserFormData = {
      name: 'John Doe',
      email: 'john@example.com',
      age: 25
    };

    const response = await firstValueFrom(service.submitForm(mockData));
    expect(response.success).toBe(true);
    expect(response.message).toBe('Formulario enviado correctamente');
    expect(response.data).toEqual(mockData);
  });
});
