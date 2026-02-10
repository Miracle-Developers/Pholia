import { useCallback } from "react";
import type { LoginFormData } from "@/application/auth/types";
import { loginAndStoreToken } from "@/application/auth/usecases/login";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import { normalizeLoginPayload } from "@/utils/auth";

export const useLogin = () => {
  const { goToHome } = useRouterNavigation();
  const { showToast } = useToast();

  const handleLogin = useCallback(
    async (values: LoginFormData) => {
      try {
        const payload = normalizeLoginPayload(values);
        const result = await loginAndStoreToken(payload);
        if (result.status === "success") {
          goToHome();
          showToast({ title: "ログインしました" });
          return;
        }

        console.warn("Login response missing token", result.response);
        showToast({ title: "ログインに失敗しました" });
      } catch (err: unknown) {
        console.error("Login failed", err);
        const message = err instanceof Error ? err.message : String(err);
        showToast({
          title: "ログインに失敗しました",
          message,
        });
      }
    },
    [goToHome, showToast],
  );

  return { handleLogin };
};
