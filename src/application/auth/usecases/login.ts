import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export type LoginPayload = {
  email?: string;
  id?: string;
  password: string;
};

export type LoginResult =
  | { status: "success"; token: string }
  | { status: "missing-token"; response: unknown };

export async function loginAndStoreToken(payload: LoginPayload): Promise<LoginResult> {
  const res = await api.login(payload);
  if (res?.token) {
    auth.setToken(res.token);
    return { status: "success", token: res.token };
  }

  return { status: "missing-token", response: res };
}
