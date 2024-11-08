export interface IForm {
  type: "loginForm" | "signUpForm" | "forgotPasswordForm";
}

export interface ILoginFormValues {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface IForgotPasswordFormValues {
  email: string;
}

export interface IRegistrationFormValues {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

export interface IChangePasswordFormValues {
  password: string;
  confirm_password: string;
}
