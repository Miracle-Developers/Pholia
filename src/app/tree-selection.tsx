import TreeSelectionContainer from '@/features/selection/components/TreeSelectionContainer';
import { useTreeSelection } from '@/features/selection/hooks/useTreeSelection';

export default function TreeSelectionPage() {
  const { handleTreeConfirm } = useTreeSelection();

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  return (
    <TreeSelectionContainer 
      onConfirm={handleTreeConfirm}
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
}