export interface UserFormData {
  name: string;
  email: string;
  age: number;
}

export interface FormSubmitResponse {
  success: boolean;
  message: string;
  data: UserFormData;
}
