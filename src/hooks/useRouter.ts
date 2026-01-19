import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToLogin = () => router.push("/login");
  const goToHome = () => router.replace("/forest-selection");
  const goToList = () => router.replace("/list");
  const goToAddition = () => router.replace("/addition");
  const goToSetting = () => router.push("/setting");
  const goToProfile = () => router.push("/profile");

  return {
    goToRegister,
    goToRegisterProfile,
    goToLogin,
    goToHome,
    goToList,
    goToAddition,
    goToSetting,
    goToProfile,
  };
};
