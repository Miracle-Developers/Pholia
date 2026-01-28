import {
  type LoginPayload,
  type LoginResult,
  loginAndStoreToken,
} from "@/application/auth/usecases/login";

type LoginInput = {
  email: string;
  password: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const normalizeLoginPayload = (input: LoginInput): LoginPayload => {
  const payload: LoginPayload = { password: input.password };
  if (emailPattern.test(input.email)) {
    payload.email = input.email;
  } else {
    payload.id = input.email?.startsWith("@") ? input.email.slice(1) : input.email;
  }
  return payload;
};

export const loginWithCredentials = async (input: LoginInput): Promise<LoginResult> => {
  const payload = normalizeLoginPayload(input);
  return loginAndStoreToken(payload);
};
