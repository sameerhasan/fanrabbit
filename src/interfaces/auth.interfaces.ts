export interface ILoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IRegistrationFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

export interface IForgotFormValues {
  email: string;
}

export interface IChangePasswordFormValues {
  password: string;
  token: string;
  uid: string;
}

export interface HttpErrorResponse {
  message: string;
}
