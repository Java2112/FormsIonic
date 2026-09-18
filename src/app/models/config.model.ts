// Interfaz TypeScript que define la estructura del objeto de configuración global de la aplicación
export interface AppConfig {
  defaultAge: number; // Edad numérica predeterminada para autocompletar en el formulario (ej. 18)
  roles: string[];   // Arreglo de strings que almacena los roles del sistema (ej. ['admin', 'user', 'guest'])
}
