import type { RegisterProfileFormData } from "@/application/auth/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import { registerProfile } from "@/provider/auth/registerProfileProvider";
import { useCallback } from "react";

export const useRegisterProfile = () => {
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
        
        let errorMessage = err?.message || String(err);
        
        // 409エラー（すでに存在するユーザー）
        if (err?.status === 409 || err?.message?.includes("409")) {
          errorMessage = "このメールアドレスまたはユーザーIDは既に登録されています";
        }
        
        showToast({
          title: "登録に失敗しました",
          message: errorMessage,
        });
      }
    },
    [goToHome, goToLogin, goToRegister, showToast],
  );

  return { handleRegister };
};
