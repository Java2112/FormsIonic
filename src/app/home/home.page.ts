import { Component, OnInit, inject } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonText, IonSpinner, IonNote } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../services/config.service';
import { UserService } from '../services/user.service';
import { FormService } from '../services/form.service';
import { AppConfig } from '../models/config.model';
import { UserFormData } from '../models/form.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent,
    IonItem,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonNote
  ],
})
export class HomePage implements OnInit {
  private fb = inject(FormBuilder);
  private configService = inject(ConfigService);
  private userService = inject(UserService);
  private formService = inject(FormService);

  myForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  configData: AppConfig | null = null;
  emailExistsError = false;

  ngOnInit() {
    this.initForm();
    this.loadConfig();
  }

  initForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  loadConfig() {
    this.configService.getConfig().subscribe({
      next: (data: AppConfig) => {
        this.configData = data;
        if (data && data.defaultAge) {
          this.myForm.patchValue({ age: data.defaultAge });
        }
      },
      error: (err) => console.error('Error cargando config', err)
    });
  }

  async onSubmit() {
    this.submitMessage = '';
    this.emailExistsError = false;

    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    const formData: UserFormData = this.myForm.value;

    this.userService.checkUserExists(formData.email).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.emailExistsError = true;
          this.isSubmitting = false;
        } else {
          this.submitData(formData);
        }
      },
      error: (err) => {
        console.error('Error al validar email', err);
        this.isSubmitting = false;
      }
    });
  }

  submitData(formData: UserFormData) {
    this.formService.submitForm(formData).subscribe({
      next: (response) => {
        this.submitMessage = response.message;
        this.isSubmitting = false;
        this.myForm.reset();
        if (this.configData && this.configData.defaultAge) {
          this.myForm.patchValue({ age: this.configData.defaultAge });
        }
      },
      error: (err) => {
        console.error('Error al enviar formulario', err);
        this.submitMessage = 'Hubo un error al enviar el formulario.';
        this.isSubmitting = false;
      }
    });
  }
}
