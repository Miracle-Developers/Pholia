import { useRouter } from "expo-router";

export const useAuthNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToLogin = () => router.push("/login");

  return { goToRegister, goToLogin };
};
