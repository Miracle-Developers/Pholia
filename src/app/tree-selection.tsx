import TreeSelectionContainer from '@/features/list/components/TreeSelectionContainer';
import { useRouterNavigation } from '@/hooks/useRouter';
import * as SecureStore from 'expo-secure-store';

export default function TreeSelectionPage() {
  const { goToList, goToProfile, goToSetting } = useRouterNavigation();

  const handleConfirm = async (treeId: number) => {
    try {
      // 選択した木のIDをセキュアストレージに保存
      await SecureStore.setItemAsync('selectedTreeId', String(treeId));
      goToList();
    } catch (error) {
      console.error('Failed to save selected tree:', error);
    }
  };

  const handleProfilePress = () => {
    goToProfile();
  };

  const handleSettingsPress = () => {
    goToSetting();
  };

  return (
    <TreeSelectionContainer
      onConfirm={handleConfirm}
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
}
