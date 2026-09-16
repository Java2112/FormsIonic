import { Component, OnInit } from '@angular/core';
import { 
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
} from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DataService } from '../services/data.service';
import { CommonModule } from '@angular/common';

/**
 * Página principal `HomePage` que implementa un formulario reactivo para dispositivos móviles.
 * 
 * En el ecosistema de Ionic Framework:
 * - Esta clase actúa como la vista o página (`page`) que se presenta dentro del `<ion-router-outlet>`.
 * - Combina componentes visuales nativos de Ionic (`ion-*`) con el módulo de formularios reactivos
 *   de Angular (`ReactiveFormsModule`) para ofrecer una experiencia táctil, validaciones en tiempo real
 *   y retroalimentación visual amigable.
 */
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  /**
   * En Angular Standalone, cada componente de Ionic utilizado en la plantilla HTML
   * debe importarse explícitamente en el arreglo `imports`.
   */
  imports: [
    CommonModule,
    ReactiveFormsModule,
    /* --- COMPONENTES DE ESTRUCTURA Y NAVEGACIÓN DE IONIC --- */
    IonHeader,   // Encabezado superior fijo adaptado a la barra de estado móvil.
    IonToolbar,  // Barra de herramientas contenedora de títulos y acciones.
    IonTitle,    // Título estilizado con tipografía nativa (iOS centrada, Android a la izquierda).
    IonContent,  // Contenedor con scroll táctil optimizado, rebote elástico y soporte para teclado móvil.
    
    /* --- COMPONENTES DE FORMULARIO E INTERACCIÓN DE IONIC --- */
    IonItem,     // Fila de formulario con bordes, separadores y distribución táctil adecuada.
    IonLabel,    // Etiqueta descriptiva para inputs (permite posiciones como 'floating', 'stacked').
    IonInput,    // Input de entrada de datos con tipos de teclado móvil (texto, email, numérico).
    IonButton,   // Botón interactivo con diseño táctil y efectos de pulsación (ripple effect en Android).
    IonSpinner,  // Animación circular de carga (loading) para dar feedback al usuario.
    IonNote,     // Texto pequeño auxiliar para mensajes de validación y advertencias.
    IonText      // Elemento tipográfico con clases de color temáticas de Ionic (success, danger, etc.).
  ],
})
export class HomePage implements OnInit {
  /** Formulario reactivo de Angular que encapsula los controles, valores y estados de validación. */
  myForm!: FormGroup;

  /** Bandera booleana que indica si el formulario se está enviando o procesando en segundo plano. */
  isSubmitting = false;

  /** Mensaje de éxito o retroalimentación que se muestra al usuario tras el procesamiento del formulario. */
  submitMessage = '';

  /** Guarda la configuración inicial obtenida desde el servicio (por ejemplo, valor de edad por defecto). */
  configData: any = null;

  /** Bandera booleana que se activa cuando la validación asíncrona determina que el correo ya existe. */
  emailExistsError = false;

  /**
   * Constructor de la página principal.
   * Inyecta las dependencias necesarias mediante el sistema de inyección de Angular.
   * 
   * @param fb Servicio `FormBuilder` para construir grupos de controles de formulario reactivo de forma concisa.
   * @param dataService Servicio `DataService` para consultar y enviar datos al backend (simulado).
   */
  constructor(
    private fb: FormBuilder,
    private dataService: DataService
  ) {}

  /**
   * Ciclo de vida `ngOnInit` de Angular.
   * Se ejecuta una única vez tras inicializarse las propiedades del componente.
   * Inicia la construcción del formulario reactivo y la carga de datos de configuración iniciales.
   */
  ngOnInit() {
    this.initForm();
    this.loadConfig();
  }

  /**
   * Construye y configura el formulario reactivo (`myForm`) con sus campos y reglas de validación sincrónicas:
   * - `name`: Requerido y mínimo 3 caracteres.
   * - `email`: Requerido y formato válido de correo electrónico.
   * - `age`: Requerido y valor numérico mínimo de 18 años.
   */
  initForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]]
    });
  }

  /**
   * Consulta al servicio `DataService` para cargar configuraciones iniciales (como la edad por defecto).
   * Se suscribe al Observable de `getConfig()` y actualiza el valor del campo `age` mediante `patchValue()`.
   */
  loadConfig() {
    this.dataService.getConfig().subscribe({
      next: (data) => {
        this.configData = data;
        // Si el backend devuelve un valor predeterminado de edad, se precarga en el formulario
        if (data && data.defaultAge) {
          this.myForm.patchValue({ age: data.defaultAge });
        }
      },
      error: (err) => console.error('Error cargando config', err)
    });
  }

  /**
   * Manejador del evento de envío del formulario (`ngSubmit`).
   * 
   * Flujo de ejecución:
   * 1. Limpia mensajes de error o estados previos.
   * 2. Verifica si el formulario es inválido; si lo es, marca todos los campos como `touched`
   *    para que Ionic/Angular muestre los mensajes de error `<ion-note>` de inmediato.
   * 3. Si es válido, activa el indicador de carga (`isSubmitting = true`), lo cual muestra
   *    el `<ion-spinner>` dentro del `<ion-button>`.
   * 4. Valida asíncronamente con `checkUserExists()` si el correo ya está registrado en el sistema.
   * 5. Si el correo no existe, delega el envío a `submitData()`.
   */
  async onSubmit() {
    this.submitMessage = '';
    this.emailExistsError = false;

    // Si el formulario contiene campos con datos inválidos o incompletos:
    if (this.myForm.invalid) {
      // Forzar que todos los controles aparezcan como tocados para disparar las alertas visuales
      this.myForm.markAllAsTouched();
      return;
    }

    // Comienza el proceso de validación y envío (muestra el spinner en la interfaz de Ionic)
    this.isSubmitting = true;
    const formData = this.myForm.value;

    // Validación asíncrona simulada: consultar si el email ya se encuentra en la base de datos
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

  /**
   * Realiza el envío efectivo de los datos del formulario hacia el servicio.
   * 
   * Tras una respuesta exitosa:
   * - Muestra el mensaje de confirmación devuelto por el servidor en la vista de Ionic (`submitMessage`).
   * - Oculta el spinner de carga (`isSubmitting = false`).
   * - Reinicia los controles del formulario (`myForm.reset()`).
   * - Restablece valores por defecto (como la edad configurada).
   * 
   * @param formData Objeto que contiene los valores limpios y validados del formulario.
   */
  submitData(formData: any) {
    this.dataService.submitForm(formData).subscribe({
      next: (response) => {
        this.submitMessage = response.message;
        this.isSubmitting = false;
        this.myForm.reset();
        // Restablecer valores iniciales tras el reset si estaban configurados
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

