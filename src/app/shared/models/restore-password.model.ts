export interface RestorePasswordModel {
  userEmail: string;
  password?: string;
  confirmPassword?: string;
  token?: string;
}
