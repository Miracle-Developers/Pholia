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
