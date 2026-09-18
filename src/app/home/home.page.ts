import { Component, OnInit, inject } from '@angular/core'; // Component: decorador de Angular; OnInit: interfaz de ciclo de vida; inject: función para inyección de dependencias
import { IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonInput, IonButton, IonText, IonSpinner, IonNote } from '@ionic/angular'; // Componentes UI del framework Ionic
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms'; // Módulo y herramientas de Angular para Formularios Reactivos
import { CommonModule } from '@angular/common'; // Módulo funcional común de Angular
import { ConfigService } from '../services/config.service'; // Servicio independiente para cargar la configuración
import { UserService } from '../services/user.service'; // Servicio independiente para validación de usuarios
import { FormService } from '../services/form.service'; // Servicio independiente para el procesamiento de formularios
import { AppConfig } from '../models/config.model'; // Interfaz tipada para el objeto de configuración
import { UserFormData } from '../models/form.model'; // Interfaz tipada para los datos del formulario

@Component({
  selector: 'app-home', // Nombre de la etiqueta personalizable para renderizar este componente
  templateUrl: 'home.page.html', // Ubicación del archivo de vista HTML asociada
  styleUrls: ['home.page.scss'], // Ubicación de los estilos SCSS específicos de esta página
  imports: [ // Componentes e importaciones requeridas al declararse como Componente Standalone
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
  // Inyección moderna de dependencias de Angular usando la función 'inject()'
  private fb = inject(FormBuilder); // Inyecta FormBuilder para crear grupos de controles y validadores
  private configService = inject(ConfigService); // Inyecta el servicio de configuración inicial
  private userService = inject(UserService); // Inyecta el servicio de validación de usuarios
  private formService = inject(FormService); // Inyecta el servicio para procesamiento de formularios

  // Declaración de propiedades de estado del componente
  myForm!: FormGroup; // Representa la estructura del formulario reactivo
  isSubmitting = false; // Indica si se está realizando una petición asíncrona (controla spinners y botones)
  submitMessage = ''; // Guarda el texto del mensaje retornado por el servidor tras enviar
  configData: AppConfig | null = null; // Almacena la configuración obtenida desde ConfigService
  emailExistsError = false; // Bandera para mostrar la alerta visual cuando un correo ya está registrado

  // Método del ciclo de vida de Angular que se ejecuta al instanciar el componente
  ngOnInit() {
    this.initForm(); // Configura la estructura y reglas de validación del formulario
    this.loadConfig(); // Llama al servicio para obtener la configuración inicial (ej. edad por defecto)
  }

  // Método encargado de definir los controles y reglas de validación del formulario
  initForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]], // Campo nombre: obligatorio, longitud mínima 3 letras
      email: ['', [Validators.required, Validators.email]], // Campo correo: obligatorio, debe cumplir sintaxis de email
      age: ['', [Validators.required, Validators.min(18)]] // Campo edad: obligatorio, valor numérico mínimo 18
    });
  }

  // Método que consulta la configuración de la app a través del ConfigService
  loadConfig() {
    // Suscripción al Observable que emite los datos de configuración
    this.configService.getConfig().subscribe({
      next: (data: AppConfig) => {
        this.configData = data; // Guarda el objeto de configuración recibido
        if (data && data.defaultAge) {
          this.myForm.patchValue({ age: data.defaultAge }); // Autocompleta la edad por defecto (18) en el control 'age'
        }
      },
      error: (err) => console.error('Error cargando config', err) // Registra en consola si falla la obtención de configuración
    });
  }

  // Método que se ejecuta al presionar el botón de submit (evento (ngSubmit) del formulario)
  async onSubmit() {
    this.submitMessage = ''; // Reinicia el mensaje de éxito previo
    this.emailExistsError = false; // Reinicia el indicador de error de correo existente

    // Evalúa si el formulario no cumple alguna regla de validación
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched(); // Marca todos los campos como 'tocados' para mostrar mensajes de error visuales
      return; // Cancela el flujo de envío si hay errores de validación
    }

    this.isSubmitting = true; // Activa el indicador de carga (deshabilita el botón y muestra el spinner)
    const formData: UserFormData = this.myForm.value; // Obtiene los valores actuales del formulario tipados como UserFormData

    // Consulta al UserService si el correo electrónico ya existe en el sistema
    this.userService.checkUserExists(formData.email).subscribe({
      next: (exists: boolean) => {
        if (exists) {
          this.emailExistsError = true; // Si existe (ej. 'test@test.com'), muestra el aviso en pantalla
          this.isSubmitting = false; // Desactiva el indicador de carga
        } else {
          this.submitData(formData); // Si no existe, procede a enviar la información al servidor
        }
      },
      error: (err) => {
        console.error('Error al validar email', err); // Muestra el error en la consola
        this.isSubmitting = false; // Desactiva el indicador de carga
      }
    });
  }

  // Método secundario que envía la información del formulario mediante el FormService
  submitData(formData: UserFormData) {
    // Suscripción al método submitForm de FormService
    this.formService.submitForm(formData).subscribe({
      next: (response) => {
        this.submitMessage = response.message; // Almacena el mensaje retornado ('Formulario enviado correctamente')
        this.isSubmitting = false; // Desactiva el spinner de carga
        this.myForm.reset(); // Restablece y vacía todos los controles del formulario
        if (this.configData && this.configData.defaultAge) {
          this.myForm.patchValue({ age: this.configData.defaultAge }); // Vuelve a colocar la edad por defecto (18)
        }
      },
      error: (err) => {
        console.error('Error al enviar formulario', err); // Registra en consola el error
        this.submitMessage = 'Hubo un error al enviar el formulario.'; // Mensaje de fallo para el usuario
        this.isSubmitting = false; // Desactiva el spinner de carga
      }
    });
  }
}
