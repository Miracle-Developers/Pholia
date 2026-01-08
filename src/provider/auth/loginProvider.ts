import {
  type LoginPayload,
  type LoginResult,
  loginAndStoreToken,
} from "@/infrastructure/auth/login";

type LoginInput = {
  email: string;
  password: string;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function normalizeLoginPayload(input: LoginInput): LoginPayload {
  const payload: LoginPayload = { password: input.password };
  if (emailPattern.test(input.email)) {
    payload.email = input.email;
  } else {
    payload.id = input.email?.startsWith("@") ? input.email.slice(1) : input.email;
  }
  return payload;
}

export async function loginWithCredentials(input: LoginInput): Promise<LoginResult> {
  const payload = normalizeLoginPayload(input);
  return loginAndStoreToken(payload);
}
