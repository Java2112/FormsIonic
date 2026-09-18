import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home.page';
import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { FormService } from '../services/form.service';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let mockConfigService: any;
  let mockUserService: any;
  let mockFormService: any;

  beforeEach(async () => {
    mockConfigService = {
      getConfig: () => of({ defaultAge: 18, roles: ['admin', 'user'] })
    };
    mockUserService = {
      checkUserExists: (email: string) => of(email === 'test@test.com')
    };
    mockFormService = {
      submitForm: (data: any) => of({ success: true, message: 'Formulario enviado correctamente', data })
    };

    await TestBed.configureTestingModule({
      imports: [HomePage],
      providers: [
        { provide: ConfigService, useValue: mockConfigService },
        { provide: UserService, useValue: mockUserService },
        { provide: FormService, useValue: mockFormService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component and load initial configuration', () => {
    expect(component).toBeTruthy();
    expect(component.configData?.defaultAge).toBe(18);
    expect(component.myForm.get('age')?.value).toBe(18);
  });

  it('should invalidate form when fields are empty or invalid', () => {
    component.myForm.patchValue({ name: 'Ab', email: 'invalid-email', age: 15 });
    expect(component.myForm.valid).toBe(false);
  });

  it('should validate form when valid values are entered', () => {
    component.myForm.patchValue({ name: 'Carlos Gomez', email: 'carlos@example.com', age: 25 });
    expect(component.myForm.valid).toBe(true);
  });

  it('should flag emailExistsError if user email already exists', () => {
    component.myForm.patchValue({ name: 'Carlos Gomez', email: 'test@test.com', age: 25 });
    component.onSubmit();
    expect(component.emailExistsError).toBe(true);
  });

  it('should successfully submit form data when user does not exist', () => {
    component.myForm.patchValue({ name: 'Carlos Gomez', email: 'nuevo@example.com', age: 25 });
    component.onSubmit();
    expect(component.submitMessage).toBe('Formulario enviado correctamente');
    expect(component.emailExistsError).toBe(false);
  });
});
