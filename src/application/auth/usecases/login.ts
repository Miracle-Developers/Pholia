import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";

export type LoginPayload = {
  email?: string;
  id?: string;
  password: string;
};

export type LoginResult =
  | { status: "success"; token: string; userId?: string }
  | { status: "missing-token"; response: unknown };

export const loginAndStoreToken = async (payload: LoginPayload): Promise<LoginResult> => {
  const res = await api.login(payload);
  if (res?.token) {
    auth.setToken(res.token);

    if (res?.user?.id) {
      auth.setUserId(String(res.user.id));
    }

    return {
      status: "success",
      token: res.token,
      userId: res?.user?.id ? String(res.user.id) : undefined,
    };
  }

  return { status: "missing-token", response: res };
};
