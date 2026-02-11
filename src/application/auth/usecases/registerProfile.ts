import * as registrationTemp from "@/application/auth/state/registrationTemp";
import * as api from "@/infrastructure/api";
import * as auth from "@/infrastructure/auth";
import { normalizeUserId } from "@/utils/auth";

type RegisterProfileInput = {
  userId?: string;
  name: string;
};

export type RegisterProfileResult =
  | { status: "missing-step1" }
  | { status: "auto-login-success" }
  | { status: "auto-login-failed" };

export const registerProfileAndLogin = async (
  input: RegisterProfileInput,
): Promise<RegisterProfileResult> => {
  const registration = registrationTemp.getTemp();
  if (!registration.email || !registration.password) {
    return { status: "missing-step1" };
  }

  const idValue = normalizeUserId(input.userId);

  try {
    await api.registerUser({
      id: idValue,
      name: input.name,
      email: registration.email ?? "",
      password: registration.password ?? "",
    });
  } catch (registerErr: unknown) {
    console.error("Registration failed", registerErr);
    const errRecord =
      registerErr && typeof registerErr === "object"
        ? (registerErr as Record<string, unknown>)
        : null;
    const status = errRecord && typeof errRecord.status === "number" ? errRecord.status : undefined;
    const message = errRecord && typeof errRecord.message === "string" ? errRecord.message : "";
    // 409エラーを上位に伝播させる
    if (status === 409 || message.includes("409")) {
      const error = new Error(
        "このメールアドレスまたはユーザーIDは既に登録されています",
      ) as Error & {
        status?: number;
      };
      error.status = 409;
      throw error;
    }
    throw registerErr;
  }

  try {
    const loginRes = await api.login({
      email: registration.email,
      password: registration.password,
    });
    if (loginRes?.token) {
      auth.setToken(loginRes.token);

      const loginRecord =
        loginRes && typeof loginRes === "object"
          ? (loginRes as { user?: { id?: string | number }; user_id?: string | number })
          : {};
      // ユーザー入力のID(Handle)ではなく、ログインレスポンスのシステムID(PK)を使用する
      const resolvedUserId = loginRecord.user?.id ?? loginRecord.user_id;
      if (resolvedUserId !== undefined && resolvedUserId !== null) {
        auth.setUserId(String(resolvedUserId));
      }

      registrationTemp.clearTemp();
      return { status: "auto-login-success" };
    }
  } catch (loginErr: unknown) {
    console.warn("Auto-login failed after registration", loginErr);
  }

  registrationTemp.clearTemp();
  return { status: "auto-login-failed" };
};
