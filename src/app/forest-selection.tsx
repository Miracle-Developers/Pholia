import ForestSelectionContainer from '@/features/forestSelection/components/ForestSelectionContainer';
import { useForestSelection } from '@/features/forestSelection/hooks/useForestSelection';

export default function ForestSelectionPage() {
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
}
