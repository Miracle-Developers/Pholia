import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goBack = () => router.back();
  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToLogin = () => router.push("/login");
  const goToHome = () => router.replace("/");
  const goToList = () => router.replace("/list");
  const goToLeafAddition = () => router.replace("/leaf-addition");
  const goToTreeAddition = () => router.replace("/tree-addition");
  const goToTreeSelection = () => router.replace("/tree-selection");
  const goToForestAddition = () => router.replace("/forest-addition");
  const goToSetting = () => router.push("/setting");
  const goToProfile = () => router.push("/profile");

  return {
    goBack,
    goToRegister,
    goToRegisterProfile,
    goToLogin,
    goToHome,
    goToList,
    goToLeafAddition,
    goToTreeAddition,
    goToTreeSelection,
    goToForestAddition,
    goToSetting,
    goToProfile,
  };
};
