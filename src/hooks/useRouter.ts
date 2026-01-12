import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToLogin = () => router.push("/login");
  const goToHome = () => router.replace("/");
  const goToForestSelection = () => router.replace("/forest-selection");

  return { goToRegister, goToRegisterProfile, goToLogin, goToHome, goToForestSelection };
};
