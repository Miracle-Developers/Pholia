import TreeSelectionContainer from "@/features/selection/components/TreeSelectionContainer";
import { useTreeSelection } from "@/features/selection/hooks/useTreeSelection";
import { useRouterNavigation } from "@/hooks/useRouter";

const TreeSelectionPage = () => {
  const { handleTreeConfirm } = useTreeSelection();
  const { goToProfile, goToSetting } = useRouterNavigation();

  return (
    <TreeSelectionContainer
      onConfirm={handleTreeConfirm}
      onPressProfile={goToProfile}
      onPressSettings={goToSetting}
    />
  );
};

export default TreeSelectionPage;
