import { useEffect, useState } from "react";
import type { Tree, TreeCarouselState } from "@/features/selection/types";

export const useTreeCarousel = (trees: Tree[], initialTreeId = 1) => {
  const [state, setState] = useState<TreeCarouselState>(() => {
    const initialIndex = trees.findIndex((tree) => tree.id === initialTreeId);
    if (trees.length === 0) {
      return { selectedTreeId: null, currentIndex: 0 };
    }
    return {
      selectedTreeId: initialTreeId,
      currentIndex: initialIndex >= 0 ? initialIndex : 0,
    };
  });

  useEffect(() => {
    if (trees.length === 0) {
      setState({ selectedTreeId: null, currentIndex: 0 });
      return;
    }
    setState((prev) => {
      const existingIndex = prev.selectedTreeId
        ? trees.findIndex((tree) => tree.id === prev.selectedTreeId)
        : -1;
      if (existingIndex >= 0) {
        return { selectedTreeId: prev.selectedTreeId, currentIndex: existingIndex };
      }
      return { selectedTreeId: trees[0].id, currentIndex: 0 };
    });
  }, [trees]);

  const handleNext = () => {
    if (trees.length === 0) return;
    const nextIndex = (state.currentIndex + 1) % trees.length;
    const nextTree = trees[nextIndex];
    setState({
      selectedTreeId: nextTree.id,
      currentIndex: nextIndex,
    });
  };

  const handlePrevious = () => {
    if (trees.length === 0) return;
    const prevIndex = state.currentIndex === 0 ? trees.length - 1 : state.currentIndex - 1;
    const prevTree = trees[prevIndex];
    setState({
      selectedTreeId: prevTree.id,
      currentIndex: prevIndex,
    });
  };

  return {
    selectedTreeId: state.selectedTreeId,
    currentIndex: state.currentIndex,
    handleNext,
    handlePrevious,
  };
};
