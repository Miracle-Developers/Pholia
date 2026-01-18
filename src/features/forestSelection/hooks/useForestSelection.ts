import { useRouter } from 'expo-router';

export const useForestSelection = () => {
  const router = useRouter();

  const handleForestConfirm = (forestId: number) => {
    console.log('Selected forest:', forestId);
    // TODO: 木の選択ページに遷移
    // router.push('/tree-selection');
  };

  return {
    handleForestConfirm,
  };
};
