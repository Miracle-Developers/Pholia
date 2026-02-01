import { useCallback } from "react";
import type { LoginFormData } from "@/application/auth/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import { loginWithCredentials } from "@/provider/auth/loginProvider";

export const useLogin = () => {
  const { goToTreeAddition } = useRouterNavigation();
  const { showToast } = useToast();

  const handleLogin = useCallback(
    async (values: LoginFormData) => {
      try {
        const result = await loginWithCredentials(values);
        if (result.status === "success") {
          goToTreeAddition();
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
    [goToTreeAddition, showToast],
  );

  return { handleLogin };
};
