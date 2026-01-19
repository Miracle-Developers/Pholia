import ForestSelectionContainer from '@/features/forestSelection/components/ForestSelectionContainer';
import { useForestSelection } from '@/features/forestSelection/hooks/useForestSelection';
import { useRouterNavigation } from '@/hooks/useRouter';

export default function ForestSelectionPage() {
  const { handleForestConfirm } = useForestSelection();
  const { goToProfile, goToSetting } = useRouterNavigation();

  const handleProfilePress = () => {
    goToProfile();
  };

  const handleSettingsPress = () => {
    goToSetting();
  };

  return (
    <ForestSelectionContainer 
      onConfirm={handleForestConfirm}
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
}
