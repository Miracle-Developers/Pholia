import ForestSelectionContainer from "@/features/selection/components/ForestSelectionContainer";
import { useForestSelection } from "@/features/selection/hooks/useForestSelection";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

const ForestSelectionPage = () => {
  const {
    handleForestConfirm,
    forests,
    currentIndex,
    handleNext,
    handlePrevious,
    isLoading,
    canConfirm,
  } = useForestSelection();
  const { goToProfile, goToSetting } = useRouterNavigation();
  const { name, userId, avatarSource } = useHeaderProfile();

  return (
    <ForestSelectionContainer
      userName={name}
      userId={userId}
      avatarSource={avatarSource}
      forests={forests}
      currentIndex={currentIndex}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onConfirm={handleForestConfirm}
      isLoading={isLoading}
      canConfirm={canConfirm}
      onPressProfile={goToProfile}
      onPressSettings={goToSetting}
    />
  );
};

export default ForestSelectionPage;
