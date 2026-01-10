import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import * as registrationTemp from "@/application/auth/state/registrationTemp";

type RegisterProfileInput = {
  userId?: string;
  name: string;
};

export type RegisterProfileResult =
  | { status: "missing-step1" }
  | { status: "auto-login-success" }
  | { status: "auto-login-failed" };

export async function registerProfileAndLogin(
  input: RegisterProfileInput,
): Promise<RegisterProfileResult> {
  const registration = registrationTemp.getTemp();
  if (!registration.email || !registration.password) {
    return { status: "missing-step1" };
  }

  const idValue = input.userId?.startsWith("@") ? input.userId.slice(1) : input.userId;

  await api.registerUser({
    id: idValue,
    name: input.name,
    email: registration.email ?? "",
    password: registration.password ?? "",
  });

  try {
    const loginRes = await api.login({
      email: registration.email,
      password: registration.password,
    });
    if (loginRes?.token) {
      auth.setToken(loginRes.token);
      registrationTemp.clearTemp();
      return { status: "auto-login-success" };
    }
  } catch (loginErr: unknown) {
    console.warn("Auto-login failed after registration", loginErr);
  }

  registrationTemp.clearTemp();
  return { status: "auto-login-failed" };
}
