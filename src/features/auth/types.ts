import type {
  AuthFormData,
  LoginFormData,
  RegisterProfileFormData,
} from "@/application/auth/types";

export type LoginFormProps = {
  defaultValues?: Partial<LoginFormData>;
  onSubmit: (values: LoginFormData) => void;
  onPressForgotPassword?: () => void;
  onPressSignUp?: () => void;
  submitLabel?: string;
  signUpLabel?: string;
};

export type RegisterFormProps = {
  defaultValues?: Partial<AuthFormData>;
  onSubmit: (values: AuthFormData) => void;
  onPressLogin?: () => void;
  submitLabel?: string;
  loginLabel?: string;
};

export type RegisterProfileFormProps = {
  defaultValues?: Partial<RegisterProfileFormData>;
  onSubmit: (values: RegisterProfileFormData) => void;
  submitLabel?: string;
};
