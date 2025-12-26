export type AuthFormData = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type RegisterFormData = AuthFormData & {
  name?: string;
  userId?: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

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
