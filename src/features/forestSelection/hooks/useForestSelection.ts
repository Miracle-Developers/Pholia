import { useRouterNavigation } from '@/hooks/useRouter';
import * as SecureStore from 'expo-secure-store';

export const useForestSelection = () => {
  const { goToTreeSelection } = useRouterNavigation();

  const handleForestConfirm = async (forestId: number) => {
    try {
      // 選択した森のIDをセキュアストレージに保存
      await SecureStore.setItemAsync('selectedForestId', String(forestId));
      console.log('Selected forest:', forestId);
      goToTreeSelection();
    } catch (error) {
      console.error('Failed to save selected forest:', error);
    }
  };

  return {
    handleForestConfirm,
  };
};
