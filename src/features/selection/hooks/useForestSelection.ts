import { useCallback, useEffect, useMemo, useState } from "react";

import { setSelectedForestId } from "@/application/selection/state/selectedForest";
import { loadUserForests } from "@/application/structure/usecases";
import { deleteForest } from "@/application/structure/usecases/deleteForest";
import { useForestCarousel } from "@/features/selection/hooks/useForestCarousel";
import type { Forest } from "@/features/selection/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";

export const useForestSelection = () => {
  const { goToTreeAction } = useRouterNavigation();
  const { showToast } = useToast();
  const [forests, setForests] = useState<Forest[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const forestImages = useMemo(
    () => [
      require("@/../assets/forest1.png"),
      require("@/../assets/forest2.png"),
      require("@/../assets/forest3.png"),
    ],
    [],
  );

  const loadForests = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await loadUserForests();
      const mapped = data.map((forest, index) => ({
        id: forest.id,
        name: forest.name,
        image: forest.imageUrl ? { uri: forest.imageUrl } : forestImages[index % forestImages.length],
      }));
      setForests(mapped);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      showToast({ title: "森の取得に失敗しました", message });
      setForests([]);
    } finally {
      setIsLoading(false);
    }
  }, [forestImages, showToast]);

  useEffect(() => {
    loadForests();
  }, [loadForests]);

  const { selectedForestId, currentIndex, handleNext, handlePrevious } = useForestCarousel(forests, 1);

  const handleForestConfirm = useCallback(() => {
    if (!selectedForestId) {
      showToast({ title: "森を選択してください", message: "森を選んでください。" });
      return;
    }
    setSelectedForestId(selectedForestId);
    goToTreeAction(selectedForestId);
  }, [goToTreeAction, selectedForestId, showToast]);

  const handleDelete = useCallback(async () => {
    if (!selectedForestId) return;
    const success = await deleteForest(selectedForestId);
    if (success) {
      showToast({ title: "削除しました", message: "森を削除しました。" });
      await loadForests();
    } else {
      showToast({ title: "削除失敗", message: "森の削除に失敗しました。" });
    }
  }, [selectedForestId, loadForests, showToast]);

  return {
    forests,
    currentIndex,
    handleNext,
    handlePrevious,
    isLoading,
    canConfirm: Boolean(selectedForestId),
    handleForestConfirm,
    handleDelete,
  };
};
