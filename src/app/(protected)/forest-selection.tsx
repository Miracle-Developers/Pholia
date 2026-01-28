import ForestSelectionContainer from '@/features/selection/components/ForestSelectionContainer';
import { useForestSelection } from '@/features/selection/hooks/useForestSelection';

const ForestSelectionPage = () => {
  const { handleForestConfirm } = useForestSelection();

  const handleProfilePress = () => {
    console.log('Profile pressed');
  };

  const handleSettingsPress = () => {
    console.log('Settings pressed');
  };

  return (
    <ForestSelectionContainer 
      onConfirm={handleForestConfirm}
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
};

export default ForestSelectionPage;
