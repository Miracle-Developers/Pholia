import AddTreeContainer from '@/features/list/components/AddTreeContainer';
import { useRouterNavigation } from '@/hooks/useRouter';

export default function AddTreePage() {
  const { goToProfile, goToSetting } = useRouterNavigation();

  const handleProfilePress = () => {
    goToProfile();
  };

  const handleSettingsPress = () => {
    goToSetting();
  };

  return (
    <AddTreeContainer
      onPressProfile={handleProfilePress}
      onPressSettings={handleSettingsPress}
    />
  );
}
