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
    handleDelete,
  } = useForestSelection();
  const { goToProfile, goToSetting, goToForestAction } = useRouterNavigation();
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
      onDelete={handleDelete}
      onBack={goToForestAction}
      isLoading={isLoading}
      canConfirm={canConfirm}
      onPressProfile={goToProfile}
      onPressSettings={goToSetting}
    />
  );
};

export default ForestSelectionPage;
