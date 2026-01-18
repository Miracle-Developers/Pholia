import { useCallback } from "react";
import type { LoginFormData } from "@/application/auth/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import { loginWithCredentials } from "@/provider/auth/loginProvider";

export function useLogin() {
  const { goToList } = useRouterNavigation();
  const { showToast } = useToast();

  const handleLogin = useCallback(
    async (values: LoginFormData) => {
      try {
        const result = await loginWithCredentials(values);
        if (result.status === "success") {
          goToList();
          showToast({ title: "ログインしました" });
          return;
        }

        console.warn("Login response missing token", result.response);
        showToast({ title: "ログインに失敗しました" });
      } catch (err: any) {
        console.error("Login failed", err);
        showToast({
          title: "ログインに失敗しました",
          message: err?.message || String(err),
        });
      }
    },
    [goToList, showToast],
  );

  return { handleLogin };
}
