import { useRouter } from "expo-router";

export const useRouterNavigation = () => {
  const router = useRouter();

  const goBack = () => router.back();
  const goToRegister = () => router.push("/register");
  const goToRegisterProfile = () => router.push("/register-profile");
  const goToTop = () => router.replace("/top");
  const goToLogin = () => router.push("/login");
  const goToHome = () => router.replace("/home");
  const goToList = () => router.replace("/list");
  const goToLeafAddition = () => router.replace("/leaf-addition");
  const goToLeafDetail = (leafId?: number) =>
    leafId !== undefined && leafId !== null
      ? router.push(`/leaf-detail?leafId=${encodeURIComponent(String(leafId))}`)
      : router.push("/leaf-detail");
  const goToTreeDetail = (treeId?: number) =>
    treeId !== undefined && treeId !== null
      ? router.push(`/tree-detail?treeId=${encodeURIComponent(String(treeId))}`)
      : router.push("/tree-detail");
  const goToTreeAddition = () => router.replace("/tree-addition");
  const goToTreeSelection = (forestId?: number) =>
    forestId !== undefined && forestId !== null
      ? router.replace(`/tree-selection?forestId=${encodeURIComponent(String(forestId))}`)
      : router.replace("/tree-selection");
  const goToTreeAction = () => router.replace("/tree-action");
  const goToForestSelection = () => router.replace("/forest-selection");
  const goToForestAddition = () => router.replace("/forest-addition");
  const goToForestAction = () => router.replace("/forest-action");
  const goToSetting = () => router.push("/setting");
  const goToProfile = () => router.push("/profile");

  return {
    goBack,
    goToRegister,
    goToRegisterProfile,
    goToTop,
    goToLogin,
    goToHome,
    goToList,
    goToLeafAddition,
    goToLeafDetail,
    goToTreeDetail,
    goToTreeAddition,
    goToTreeSelection,
    goToTreeAction,
    goToForestSelection,
    goToForestAddition,
    goToForestAction,
    goToSetting,
    goToProfile,
  };
};
