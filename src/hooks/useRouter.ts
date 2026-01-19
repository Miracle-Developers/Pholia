import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToLogin = () => router.push("/login");
  const goToHome = () => router.replace("/");
  const goToList = () => router.replace("/list");
  const goToSetting = () => router.push("/setting");
  const goToProfile = () => router.push("/profile");

  return {
    goToRegister,
    goToRegisterProfile,
    goToLogin,
    goToHome,
    goToList,
    goToSetting,
    goToProfile,
  };
};
