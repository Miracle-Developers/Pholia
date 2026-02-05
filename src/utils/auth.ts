type LoginInput = {
  email: string;
  password: string;
};

type LoginPayload = {
  email?: string;
  id?: string;
  password: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeUserId = (value?: string | null) => {
  if (!value) return value ?? undefined;
  return value.startsWith("@") ? value.slice(1) : value;
};

export const normalizeLoginPayload = (input: LoginInput): LoginPayload => {
  const payload: LoginPayload = { password: input.password };
  if (emailPattern.test(input.email)) {
    payload.email = input.email;
  } else {
    payload.id = normalizeUserId(input.email);
  }
  return payload;
};
