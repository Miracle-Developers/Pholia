import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { loadUserStructure } from "@/application/structure/usecases/loadUserStructure";
import { loadTree } from "@/application/trees/usecases/loadTree";
import { useTreeCarousel } from "@/features/selection/hooks/useTreeCarousel";
import type { Tree } from "@/features/selection/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";

export const useTreeSelection = () => {
  const { goToList } = useRouterNavigation();
  const { showToast } = useToast();
  const [trees, setTrees] = useState<Tree[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const loadedTreeIds = useRef<Set<number>>(new Set());

  const treeImages = useMemo(
    () => [
      require("@/../assets/tree1.png"),
      require("@/../assets/tree2.png"),
      require("@/../assets/tree3.png"),
    ],
    [],
  );

  const loadTrees = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await loadUserStructure();
      const mapped = data.map((tree, index) => ({
        id: tree.id,
        name: tree.name,
        image: treeImages[index % treeImages.length],
      }));
      setTrees(mapped);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      showToast({ title: "木の取得に失敗しました", message });
      setTrees([]);
    } finally {
      setIsLoading(false);
    }
  }, [showToast, treeImages]);

  useEffect(() => {
    loadTrees();
  }, [loadTrees]);

  const { selectedTreeId, currentIndex, handleNext, handlePrevious } = useTreeCarousel(trees, 1);

  const fetchTreeDetail = useCallback(
    async (treeId: number) => {
      try {
        const data = await loadTree(treeId);
        setTrees((prev) =>
          prev.map((tree) => (tree.id === treeId ? { ...tree, name: data.name ?? tree.name } : tree)),
        );
        loadedTreeIds.current.add(treeId);
        return true;
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        showToast({ title: "木の取得に失敗しました", message });
        throw error;
      }
    },
    [showToast],
  );

  useEffect(() => {
    if (!selectedTreeId) return;
    if (loadedTreeIds.current.has(selectedTreeId)) return;
    fetchTreeDetail(selectedTreeId).catch(() => {});
  }, [fetchTreeDetail, selectedTreeId]);

  const handleTreeConfirm = useCallback(async () => {
    if (!selectedTreeId) {
      showToast({ title: "木を選択してください", message: "木を選んでください。" });
      return;
    }
    try {
      if (!loadedTreeIds.current.has(selectedTreeId)) {
        await fetchTreeDetail(selectedTreeId);
      }
      goToList();
    } catch {
      return;
    }
  }, [fetchTreeDetail, goToList, selectedTreeId, showToast]);

  return {
    trees,
    currentIndex,
    handleNext,
    handlePrevious,
    isLoading,
    canConfirm: Boolean(selectedTreeId),
    handleTreeConfirm,
  };
};
