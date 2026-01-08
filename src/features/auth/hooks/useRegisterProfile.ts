import { useCallback } from "react";
import type { RegisterProfileFormData } from "@/features/auth/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import { registerProfile } from "@/provider/auth/registerProfileProvider";

export function useRegisterProfile() {
  const { goToLogin, goToRegister, goToHome } = useRouterNavigation();
  const { showToast } = useToast();

  const handleRegister = useCallback(
    async (values: RegisterProfileFormData) => {
      try {
        const result = await registerProfile({
          userId: values.userId,
          name: values.name,
        });

        if (result.status === "missing-step1") {
          goToRegister();
          showToast({
            title: "情報が不足しています",
            message: "メールアドレスとパスワードを先に入力してください",
          });
          return;
        }

        if (result.status === "auto-login-success") {
          goToHome();
          showToast({ title: "ログインしました" });
          return;
        }

        goToLogin();
        showToast({
          title: "登録に失敗しました",
          message: "自動ログインできませんでした。ログインしてください。",
        });
      } catch (err: any) {
        console.error("Register failed", err);
        showToast({
          title: "登録に失敗しました",
          message: err?.message || String(err),
        });
      }
    },
    [goToHome, goToLogin, goToRegister, showToast],
  );

  return { handleRegister };
}
