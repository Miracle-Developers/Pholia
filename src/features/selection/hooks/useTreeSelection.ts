import { useRouterNavigation } from "@/hooks/useRouter";

export const useTreeSelection = () => {
  const { goToList } = useRouterNavigation();

  const handleTreeConfirm = (treeId: number) => {
    console.log(`Selected tree ID: ${treeId}`);
    // Có thể navigate đến trang tiếp theo hoặc lưu trữ selection
    goToList();
  };

  return {
    handleTreeConfirm,
  };
};
