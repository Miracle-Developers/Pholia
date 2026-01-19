import AddForestContainer from '@/features/forestSelection/components/AddForestContainer';
import { useRouterNavigation } from '@/hooks/useRouter';

export default function AddForestScreen() {
  const { goToProfile, goToSetting } = useRouterNavigation();

  const handleProfilePress = () => {
    goToProfile();
  };

  const handleSettingsPress = () => {
    goToSetting();
  };

  return (
    <AddForestContainer
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
}
