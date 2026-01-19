import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToLogin = () => router.push("/login");
  const goToForestSelection = () => router.replace("/forest-selection");
  const goToList = () => router.replace("/list");
  const goToAddition = () => router.replace("/addition");
  const goToAddForest = () => router.push("/add-forest");
  const goToTreeSelection = () => router.push("/tree-selection");
  const goToAddTree = () => router.push("/add-tree");
  const goToSetting = () => router.push("/setting");
  const goToProfile = () => router.push("/profile");

  return {
    goToRegister,
    goToRegisterProfile,
    goToLogin,
    goToForestSelection,
    goToList,
    goToAddition,
    goToAddForest,
    goToTreeSelection,
    goToAddTree,
    goToSetting,
    goToProfile,
  };
};
