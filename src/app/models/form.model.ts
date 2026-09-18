// Interfaz TypeScript que representa el contrato de los datos capturados en el formulario
export interface UserFormData {
  name: string;  // Nombre completo del usuario
  email: string; // Correo electrónico del usuario
  age: number;   // Edad del usuario
}

// Interfaz TypeScript que define la estructura de respuesta enviada tras el procesamiento del formulario
export interface FormSubmitResponse {
  success: boolean;   // Estado booleano de la transacción (true si fue exitoso)
  message: string;    // Texto de confirmación o error enviado al cliente
  data: UserFormData; // Datos del formulario procesados que retornan como confirmación
}
