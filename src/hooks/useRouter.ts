import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToLogin = () => router.push("/login");

  return { goToRegister, goToRegisterProfile, goToLogin };
};
