import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { getSelectedForestId, setSelectedForestId } from "@/application/selection/state/selectedForest";
import { setSelectedTree } from "@/application/selection/state/selectedTree";
import { loadUserTrees } from "@/application/structure/usecases/loadUserTrees";
import { loadTree } from "@/application/trees/usecases/loadTree";
import { useTreeCarousel } from "@/features/selection/hooks/useTreeCarousel";
import type { Tree } from "@/features/selection/types";
import { useRouterNavigation } from "@/hooks/useRouter";
import { useToast } from "@/hooks/useToast";
import { useLocalSearchParams } from "expo-router";

export const useTreeSelection = () => {
  const { goToTreeDetail } = useRouterNavigation();
  const { showToast } = useToast();
  const params = useLocalSearchParams<{ forestId?: string }>();
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
      const forestIdParam = Array.isArray(params.forestId) ? params.forestId[0] : params.forestId;
      const parsedForestId =
        typeof forestIdParam === "string" && forestIdParam.trim() !== ""
          ? Number(forestIdParam)
          : undefined;
      const routeForestId =
        typeof parsedForestId === "number" && Number.isFinite(parsedForestId)
          ? parsedForestId
          : undefined;
      const selectedForestId = routeForestId ?? getSelectedForestId();
      if (routeForestId && Number.isFinite(routeForestId)) {
        setSelectedForestId(routeForestId);
      }
      const forestId =
        typeof selectedForestId === "number" && Number.isFinite(selectedForestId)
          ? selectedForestId
          : undefined;
      const data = await loadUserTrees(forestId);
      const mapped = data.map((tree, index) => ({
        id: tree.id,
        name: tree.name,
        image: tree.imageUrl ? { uri: tree.imageUrl } : treeImages[index % treeImages.length],
      }));
      setTrees(mapped);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      showToast({ title: "木の取得に失敗しました", message });
      setTrees([]);
    } finally {
      setIsLoading(false);
    }
  }, [params.forestId, showToast, treeImages]);

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
      const selected = trees.find((tree) => tree.id === selectedTreeId);
      setSelectedTree({ id: selectedTreeId, name: selected?.name, image: selected?.image });
      goToTreeDetail(selectedTreeId);
    } catch {
      return;
    }
  }, [fetchTreeDetail, goToTreeDetail, selectedTreeId, showToast, trees]);

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
