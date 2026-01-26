import { useRouter } from 'expo-router';

export function useTreeSelection() {
  const router = useRouter();

  const handleTreeConfirm = (treeId: number) => {
    console.log(`Selected tree ID: ${treeId}`);
    // Có thể navigate đến trang tiếp theo hoặc lưu trữ selection
    router.push('/list'); // hoặc trang khác tùy theo flow của app
  };

  return {
    handleTreeConfirm,
  };
}