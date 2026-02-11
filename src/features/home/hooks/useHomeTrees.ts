import { useEffect, useMemo, useState } from "react";

import { getSelectedForestId } from "@/application/selection/state/selectedForest";
import type { TreeOption } from "@/application/structure/usecases/loadUserStructure";
import { loadUserTrees } from "@/application/structure/usecases/loadUserTrees";
import { useTreeCarousel } from "@/features/selection/hooks/useTreeCarousel";
import type { Tree } from "@/features/selection/types";

const fallbackImages = [
  require("@/../assets/tree(sick).png"),
  require("@/../assets/tree(normal).png"),
  require("@/../assets/tree(fun).png"),
];

type HomeTreeState = {
  currentTree: Tree | null;
  hasTrees: boolean;
  isLoading: boolean;
  handleNext: () => void;
  handlePrevious: () => void;
};

export const useHomeTrees = (): HomeTreeState => {
  const [trees, setTrees] = useState<TreeOption[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const displayTrees = useMemo<Tree[]>(
    () =>
      trees.map((tree, index) => ({
        id: tree.id,
        name: tree.name,
        image: tree.imageUrl ? { uri: tree.imageUrl } : fallbackImages[index % fallbackImages.length],
      })),
    [trees],
  );
  const { currentIndex, handleNext, handlePrevious } = useTreeCarousel(displayTrees);
  const currentTree = displayTrees[currentIndex] ?? null;

  useEffect(() => {
    let isActive = true;

    const load = async () => {
      try {
        setIsLoading(true);
        const forestId = getSelectedForestId() ?? undefined;
        const trees = await loadUserTrees(forestId);
        if (!isActive) return;
        setTrees(trees);
      } catch (error) {
        if (!isActive) return;
        console.warn("木の読み込みに失敗:", error);
        setTrees([]);
      } finally {
        if (isActive) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => {
      isActive = false;
    };
  }, []);

  return {
    currentTree,
    hasTrees: displayTrees.length > 0,
    isLoading,
    handleNext,
    handlePrevious,
  };
};
