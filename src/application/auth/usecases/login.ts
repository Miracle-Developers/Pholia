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

export async function loginAndStoreToken(payload: LoginPayload): Promise<LoginResult> {
  const res = await api.login(payload);
  if (res?.token) {
    auth.setToken(res.token);

    if (res?.user?.id) {
      auth.setUserId(res.user.id);
    } else if (res?.user_id) {
      auth.setUserId(res.user_id);
    } else if (res?.userId) {
      auth.setUserId(res.userId);
    }

    return {
      status: "success",
      token: res.token,
      userId: res?.user?.id || res?.user_id || res?.userId
    };
  }

  return { status: "missing-token", response: res };
}
