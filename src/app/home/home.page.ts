import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonLabel, IonInput, IonButton, IonText, IonSpinner, IonNote } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

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
    IonLabel,
    IonInput,
    IonButton,
    IonText,
    IonSpinner,
    IonNote
  ],
})
export class HomePage implements OnInit {
  myForm!: FormGroup;
  isSubmitting = false;
  submitMessage = '';
  configData: any = null;
  emailExistsError = false;

  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

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
    this.dataService.getConfig().subscribe({
      next: (data) => {
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
    const formData = this.myForm.value;

    this.dataService.checkUserExists(formData.email).subscribe({
      next: (exists) => {
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

  submitData(formData: any) {
    this.dataService.submitForm(formData).subscribe({
      next: (response) => {
        this.submitMessage = response.message;
        this.isSubmitting = false;
        this.myForm.reset();
        if (this.configData) {
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
