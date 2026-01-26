import TreeSelectionContainer from '@/features/selection/components/TreeSelectionContainer';
import { useTreeSelection } from '@/features/selection/hooks/useTreeSelection';
import { useRouter } from 'expo-router';

export default function TreeSelectionPage() {
  const { handleTreeConfirm } = useTreeSelection();
  const router = useRouter();

  const handleProfilePress = () => {
    router.push('/profile');
  };

  const handleSettingsPress = () => {
    router.push('/setting');
  };

  return (
    <TreeSelectionContainer 
      onConfirm={handleTreeConfirm}
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
}