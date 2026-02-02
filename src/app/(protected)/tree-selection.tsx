import TreeSelectionContainer from "@/features/selection/components/TreeSelectionContainer";
import { useTreeSelection } from "@/features/selection/hooks/useTreeSelection";
import { useHeaderProfile } from "@/hooks/useHeaderProfile";
import { useRouterNavigation } from "@/hooks/useRouter";

const TreeSelectionPage = () => {
  const {
    handleTreeConfirm,
    trees,
    currentIndex,
    handleNext,
    handlePrevious,
    isLoading,
    canConfirm,
  } = useTreeSelection();
  const { goToProfile, goToSetting } = useRouterNavigation();
  const { name, userId, avatarSource } = useHeaderProfile();

  return (
    <TreeSelectionContainer
      userName={name}
      userId={userId}
      avatarSource={avatarSource}
      trees={trees}
      currentIndex={currentIndex}
      onPrevious={handlePrevious}
      onNext={handleNext}
      onConfirm={handleTreeConfirm}
      isLoading={isLoading}
      canConfirm={canConfirm}
      onPressProfile={goToProfile}
      onPressSettings={goToSetting}
    />
  );
};

export default TreeSelectionPage;
