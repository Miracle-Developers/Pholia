import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToRegister2 = () => router.push("/register2");
  const goToLogin = () => router.push("/login");

  return { goToRegister, goToRegister2, goToLogin };
};
